import {Command, flags} from '@oclif/command'

import {getProjects} from '../get-projects'

export default class Projects extends Command {
  static description = 'list projects'

  static examples = [
    `$ tim projects
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static strict = false

  async run() {
    this.parse(Projects)

    const projects = await getProjects(this.config.configDir)
    if (projects.length > 0) {
      projects.map(x => this.log(x))
    } else {
      this.error('You have no projects\nAdd one using: tim add')
    }
  }
}
