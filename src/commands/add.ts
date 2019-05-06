import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as Task from 'data.task'
import {existsSync, outputJson} from 'fs-extra'
import {futurize} from 'futurize'

import {getProjectFile} from '../get-project-file'
import {eitherFromBool, eitherFromNullable} from '../utils'

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

    const project = await eitherFromNullable(args.project)
      .fold(
        () => cli.prompt('What is your project called?')
        , (x: string) => x)

    const projectFile = await getProjectFile(this.config.configDir, project)

    const future = futurize(Task)

    const output = future(outputJson)

    const outputProject = () => output(projectFile, {name: project})
      .fork(
        this.error
        , () => this.log(`The project: "${project}" was created`))

    eitherFromBool(existsSync(projectFile))
      .fold(
        outputProject
        , () => this.error('Project already exists'))
  }
}
