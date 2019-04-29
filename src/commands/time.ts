import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import {existsSync, readJSON} from 'fs-extra'

import {default as formatTime} from '../format-time'
import {getDayFile} from '../get-day-file'

export default class Time extends Command {
  static description = 'list past sessions'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    this.parse(Time)
    const now = new Date()
    const dayFile = await getDayFile(this.config.configDir, now)

    if (existsSync(dayFile)) {
      const dayObject = await readJSON(dayFile)
      const parsedDay = [{}, ...dayObject.sessions].reduce((acc, session) => {
        let newAcc = acc
        if (acc[session.name]) {
          newAcc[session.name] += session.time
        } else {
          newAcc[session.name] = session.time
        }

        return newAcc
      })

      const dayArray = Object.keys(parsedDay).map(name => ({name, time: parsedDay[name]}))

      cli.table(dayArray, {
        name: {
          minWidth: 10,
          header: 'Project'
        },
        time: {
          get: row => formatTime(row.time)
        }
      })
    } else {
      this.log("You haven't logged any sessions today")
    }
  }
}
