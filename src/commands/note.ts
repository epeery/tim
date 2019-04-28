import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import {readJSON, writeFile} from 'fs-extra'

import {getCurrentProjectFile} from '../get-current-project-file'

export default class Note extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    note: flags.string({char: 'n', description: 'note to add'}),
  }

  async run() {
    const {flags} = this.parse(Note)

    const currentProjectFile = await getCurrentProjectFile(this.config.configDir)
    const current = await readJSON(currentProjectFile)

    if (current.name) {
      let note: string

      if (!flags.note) {
        note = await cli.prompt('Note')
      } else {
        note = flags.note
      }

      current.notes = [...current.notes, note]

      const json = JSON.stringify(current, null, 4)
      await writeFile(currentProjectFile, json, 'utf-8')

      this.log(`Note added to: ${current.name}`)
    } else {
      this.error('No active project')
    }
  }
}
