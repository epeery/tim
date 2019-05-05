import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import {existsSync, outputJson} from 'fs-extra'

import {getProjectFile} from '../get-project-file'

export default class Add extends Command {
  static description = 'add a new project'

  static examples = [
    `$ tim add myproject
`,
  ]

  static flags = {help: flags.help({char: 'h'})}

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Add)

    const Right = (x: any) => ({
      x,
      map: (f: any) => Right(f(x)),
      fold: (_: any, g: any) => g(x),
      chain: (f: any) => f(x),
      ap: (o: any) => x(o.x),
      inspect: () => `Right(${x})`
    })

    const Left = (x: any) => ({
      x,
      map: (_: any) => Left(x),
      fold: (f: any, _: any) => f(x),
      chain: (_: any) => Left(x),
      ap: (_: any) => Left(x),
      inspect: () => `Left(${x})`
    })

    // eitherFromNullable :: a -> Either a
    const eitherFromNullable = (x: any) => (x !== null && x !== undefined) ? Right(x) : Left(null)

    // eitherFromNullable :: Bool -> Either Bool
    const eitherFromBool = (x: boolean) => x ? Right(x) : Left(false)

    const project = await eitherFromNullable(args.project)
      .fold(
        () => cli.prompt('What is your project called?')
        , (x: string) => x
      )

    const projectFile = await getProjectFile(this.config.configDir, project)

    eitherFromBool(await existsSync(projectFile))
      .fold(
        async () => {
          await outputJson(projectFile, {name: project})
          this.log(`The project: "${project}" was created`)
        }
        , () => this.error('Project already exists')
      )
  }
}
