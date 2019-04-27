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

    let project = args.project

    if (!args.project) {
      project = await cli.prompt('What is your project called?')
    }

    const projectFile = await getProjectFile(this.config.configDir, project)

    if (existsSync(projectFile)) {
      this.error('Project already exists')
    } else {
      outputJson(projectFile, {name: project})
      this.log(`The project "${project}" was created`)
    }
  }
}
