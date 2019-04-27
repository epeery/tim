import {Command, flags} from '@oclif/command'
import * as dateFormat from 'dateformat'
import {readJSON} from 'fs-extra'

import {getCurrentProjectFile} from '../get-current-project-file'

export default class Status extends Command {
  static description = 'display current tracking status'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static strict = false

  async run() {
    this.parse(Status)

    const currentProjectFile = await getCurrentProjectFile(this.config.configDir)
    const config = await readJSON(currentProjectFile)

    if (config.start) {
      const startDate = new Date(config.start)
      const startTime = dateFormat(startDate, 'HH:MM')

      this.log(`The project "${config.name}" was started at ${startTime}`)
    } else {
      this.log('No active project')
    }
  }
}
