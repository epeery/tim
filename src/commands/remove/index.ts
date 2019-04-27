import {Command, flags} from '@oclif/command'
import {existsSync, outputJson, readJSON, remove} from 'fs-extra'
import {prompt} from 'inquirer'

import {autocompleteProject} from '../../autocomplete-project'
import {getCurrentProjectFile} from '../../get-current-project-file'
import {getProjectDir} from '../../get-project-dir'

export default class Remove extends Command {
  static description = 'remove a project'

  static examples = [
    `$ tim remove myproject
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    confirm: flags.boolean({char: 'c'}),
  }

  static args = [{name: 'project'}]

  async run() {
    const {args, flags} = this.parse(Remove)
    let project = args.project
    let projectFile = await getProjectDir(this.config.configDir, project)

    if (!project || !existsSync(projectFile)) {
      project = await autocompleteProject(
        this.config.configDir,
        () => this.error('You have no projects\nAdd one using: tim add')
      )
      projectFile = await getProjectDir(this.config.configDir, project)
    }

    let confirm = {confirm: false}
    if (!flags.confirm) {
      confirm = await prompt({type: 'confirm', name: 'confirm', message: `Are you sure you want to remove: ${project}?`})
    }

    if (flags.confirm || confirm.confirm) {
      const currentProjectFile = await getCurrentProjectFile(this.config.configDir)
      const current = await readJSON(currentProjectFile)

      remove(projectFile)

      if (current.name === project) {
        await outputJson(currentProjectFile, {})
      }

      this.log(`The project "${project}" was removed`)
    } else {
      this.log(`The project "${project}" was not removed`)
    }
  }
}
