import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as dateFormat from 'dateformat'
import {existsSync, readJSON} from 'fs-extra'

import {autocompleteProject} from '../autocomplete-project'
import {getDayFile} from '../get-day-file'
import {getProjectFile} from '../get-project-file'

export default class Notes extends Command {
  static description = 'display notes from the day'

  static flags = {
    help: flags.help({char: 'h'}),
    all: flags.boolean({char: 'a', description: 'display notes from all projects'})
  }

  static args = [{name: 'project'}]

  async run() {
    const {args, flags} = this.parse(Notes)

    const now = new Date()
    const dayFile = await getDayFile(this.config.configDir, now)

    if (existsSync(dayFile)) {
      const day = await readJSON(dayFile)
      let tree = cli.tree()

      if (!flags.all) {
        let project = args.project
        const projectFile = await getProjectFile(this.config.configDir, project)

        if (!project || !existsSync(projectFile)) {
          project = await autocompleteProject(
            this.config.configDir,
            () => this.error('You have no projects\nAdd one using: tim add')
          )
        }
        const projectSessions = day.sessions.filter(({name}: {name: string}) => name === project)
        const sessionsWithNotes = projectSessions.filter(({notes}: {notes: Array<string>}) => notes.length > 0)

        if (sessionsWithNotes.length > 0) {
          sessionsWithNotes.map(({start, end, notes}: {start: string, end: string, notes: Array<string>}) => {
            const label = `${dateFormat(start, 'HH:MM')}-${dateFormat(end, 'HH:MM')}`

            if (!tree.nodes[label]) {
              tree.insert(label)
            }

            notes.map((note: string) => tree.nodes[label].insert(note))
          })
        } else {
          this.log(`You have no notes for project: ${project}`)
        }

      } else {
        const sessionsWithNotes = day.sessions.filter(({notes}: {notes: Array<string>}) => notes.length > 0)

        sessionsWithNotes.map(({name, start, end, notes}: {name: string, start: string, end: string, notes: Array<string>}) => {
          const label = `${name}: ${dateFormat(start, 'HH:MM')}-${dateFormat(end, 'HH:MM')}`

          if (!tree.nodes[label]) {
            tree.insert(label)
          }

          notes.map((note: string) => tree.nodes[label].insert(note))
        })
      }

      tree.display()
    } else {
      this.log("You haven't logged any notes today")
    }
  }
}
