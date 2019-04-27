import {Command, flags} from '@oclif/command'

export default class RemoveSession extends Command {
  static description = 'remove a tracking session'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'session'}]

  async run() {
    const {args, flags} = this.parse(RemoveSession)

    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/eli/Projects/tim/src/commands/remove/session.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
