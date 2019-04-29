import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as dateFormat from 'dateformat'
import {existsSync, readJSON} from 'fs-extra'

import {autocompleteProject} from '../autocomplete-project'
import {getDayFile} from '../get-day-file'
import {getProjectFile} from '../get-project-file'

export default class Sessions extends Command {
  static description = "list today's sessions"

  static flags = { help: flags.help({char: 'h'}),
    all: flags.boolean({char: 'a', description: 'display sessions for all projects'}),
    ...cli.table.flags()
  }

  static args = [{name: 'project'}]

  async run() {
    const {args, flags} = this.parse(Sessions)
    let project = args.project
    const projectFile = await getProjectFile(this.config.configDir, project)

    const now = new Date()
    const dayFile = await getDayFile(this.config.configDir, now)
    const day = await readJSON(dayFile)

    if (!flags.all) {
      if (!project || !existsSync(projectFile)) {
        project = await autocompleteProject(
          this.config.configDir,
          () => this.error('You have no projects\nAdd one using: tim add')
        )
      }

      const filteredSessions = day.sessions.filter(({name}: {name: string}) => name === project)
      if (filteredSessions.length > 0) {
        printSessions(filteredSessions)
      } else {
        this.log(`You haven't logged any sessions for: "${project}" today`)
      }
    } else {
      if (day.sessions.length > 0) {
        printSessions(day.sessions)
      } else {
        this.log("You haven't logged any sessions today")
      }
    }

    function printSessions(sessions: Array<object>) {
      cli.table(sessions, {
        start: {
          minWidth: 7,
          get: (row: any) => dateFormat(row.start, 'HH:mm')
        },
        end: {
          minWidth: 7,
          get: (row: any) => dateFormat(row.end, 'HH:mm')
        },
        name: {
          minWidth: 7,
          header: 'Project'
        },
        note: {
          minWidth: 7,
          get: (row: any) => row.notes[0] || ''
        },
        id: {
          header: 'ID',
          extended: true
        }
      }, {
        ...flags
      })
    }
  }
}
