import {Command, flags} from '@oclif/command'
import * as Task from 'data.task'
import {existsSync, outputJson, readJSON} from 'fs-extra'
import {futurize} from 'futurize'

import {autocompleteProject} from '../autocomplete-project'
import {getCurrentProjectFile} from '../get-current-project-file'
import {getProjectFile} from '../get-project-file'
import {eitherFromBool, eitherFromNullable} from '../utils'

import {default as Stop} from './stop'

export default class Start extends Command {
  static description = 'start a session'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'project'}]

  async run() {
    const {args} = this.parse(Start)

    const autocomplete = () => autocompleteProject(
      this.config.configDir,
      () => this.error('You have no projects\nAdd one using: tim add')
    )

    const project = await eitherFromNullable(args.project).fold(
      autocomplete
      , (p: string) => p
    )

    const currentProjectFile = await getCurrentProjectFile(this.config.configDir)

    const future = futurize(Task)
    const read = future(readJSON)

    const projectFile = await getProjectFile(this.config.configDir, project)

    eitherFromBool(existsSync(projectFile)).fold(
      () => this.error("Project doesn't exist")
      , () => null
    )

    const getJsonFormat = (name: string) => (start: string) => ({
      name,
      start,
      notes : []
    })

    const start = new Date()

    const output = future(outputJson)

    // TODO: REFACTOR THIS UGLINESS
    const stop = async (c: string) => {
      if (c) {
        await Stop.run()
      }
      outputProject()
    }

    read(currentProjectFile)
      .map((c: any) => c.name)
      .fork(this.error, (c: any) => stop(c))

    const outputProject = () =>
      output(currentProjectFile, getJsonFormat(project)(start.toJSON()))
        .fork(
          this.error
          , () => this.log(`The project: "${project}" was started`))
  }
}
