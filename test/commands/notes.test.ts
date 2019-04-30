import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('notes', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'notes-test'])
    .command(['start', 'notes-test'])
    .command(['note', '-n', '"This is a note"'])
    .command(['note', '-n', '"This is another note"'])
    .command(['stop', 'notes-test'])
    .stdout()
    .command(['notes', 'notes-test'])
    .do(() => remove('./test/test-config'))
    .it('display notes', ctx => {
      expect(ctx.stdout).to.contain('This is a note')
      expect(ctx.stdout).to.contain('This is another note')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['notes', '-a'])
    .do(() => remove('./test/test-config'))
    .it('no notes', ctx => {
      expect(ctx.stdout).to.contain("You haven't logged any notes today")
    })
})
