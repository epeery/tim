import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('note', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'note-test'])
    .command(['start', 'note-test'])
    .stdout()
    .command(['note', '-n', '"This is a note"'])
    .do(() => remove('./test/test-config'))
    .it('writes note', ctx => {
      expect(ctx.stdout).to.contain('Note added to: note-test')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['note', '-n', '"This is a note"'])
    .exit(2)
    .do(() => remove('./test/test-config'))
    .it('exists if no project is active')
})
