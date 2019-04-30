import {Command, flags} from '@oclif/command'
import {existsSync, readJSON, writeFile} from 'fs-extra'
import {prompt} from 'inquirer'

import {getDayFile} from '../../get-day-file'

export default class RemoveSession extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    confirm: flags.boolean({char: 'c'})
  }

  static args = [{name: 'id', description: 'ID of session to remove\nfind with: tim sessions -x', required: true}]

  async run() {
    const {args, flags} = this.parse(RemoveSession)
    let id = args.id

    const now = new Date()
    const dayFile = await getDayFile(this.config.configDir, now)
    if (existsSync(dayFile)) {
      const day = await readJSON(dayFile)
      const filteredSessions = day.sessions.filter(({id: sessionID}: {id: string}) => sessionID !== id)

      if (filteredSessions.length !== day.sessions.length) {
        let confirm = {confirm: false}
        if (!flags.confirm) {
          confirm = await prompt({type: 'confirm', name: 'confirm', message: `Are you sure you want to remove: ${id}?`})
        }

        if (flags.confirm || confirm.confirm) {
          day.sessions = filteredSessions

          const json = JSON.stringify(day, null, 4)
          await writeFile(dayFile, json, 'utf-8')

          this.log(`Removed session with ID: ${id}`)
        } else {
          this.log(`Canceled removal of session: ${id}`)
        }
      } else {
        this.log(`No session exists with ID: ${id}`)
      }

    } else {
      this.log("You haven't logged any sessions today")
    }
  }
}
