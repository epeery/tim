import {Command, flags} from '@oclif/command'
import {existsSync, outputJson, readJSON} from 'fs-extra'

import {autocompleteProject} from '../autocomplete-project'
import {getCurrentProjectFile} from '../get-current-project-file'
import {getProjectFile} from '../get-project-file'

import {default as Stop} from './stop'

export default class Start extends Command {
  static description = 'start a session'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Start)
    let project = args.project

    const currentProjectFile = await getCurrentProjectFile(this.config.configDir)
    const current = await readJSON(currentProjectFile)

    const projectFile = await getProjectFile(this.config.configDir, project)

    if (!project || !existsSync(projectFile)) {
      project = await autocompleteProject(
        this.config.configDir,
        () => this.error('You have no projects\nAdd one using: tim add')
      )
    }

    const getJsonFormat = (name: string) => (start: string) => ({
      name,
      start,
      notes : []
    })

    const start = new Date()

    if (current.name) {
      await Stop.run()
    }

    outputJson(currentProjectFile, getJsonFormat(project)(start.toJSON()))
    this.log(`The project: "${project}" was started`)
  }
}
