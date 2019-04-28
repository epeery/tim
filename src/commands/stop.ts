import {Command, flags} from '@oclif/command'
import {existsSync, readJSON, writeFile} from 'fs-extra'

import {getCurrentProjectFile} from '../get-current-project-file'
import {getDayFile} from '../get-day-file'

export default class Stop extends Command {
  static description = 'stop current session'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static strict = false

  async run() {
    this.parse(Stop)

    const currentProjectFile = await getCurrentProjectFile(this.config.configDir)
    const current = await readJSON(currentProjectFile)

    if (current.start) {
      const start = new Date(current.start)
      const now = new Date()

      const difference = Math.abs(now.getTime() - start.getTime())

      const dayFile = await getDayFile(this.config.configDir, now)
      let dayObject = {
        date: now.toISOString(),
        sessions: [
        ]
      }

      const session = {
        name: current.name,
        start: start.toISOString(),
        end: now.toISOString(),
        time: difference,
        notes: current.notes
      }

      if (existsSync(dayFile)) {
        dayObject = await readJSON(dayFile)
      }

      let sessions: object[] = dayObject.sessions
      sessions.push(session)

      const json = JSON.stringify(dayObject, null, 4)
      await writeFile(dayFile, json, 'utf-8')
      await writeFile(currentProjectFile, '{}')

      this.log(`Stopped tracking: ${current.name}`)
    } else {
      this.error('No active project')
    }
  }
}
