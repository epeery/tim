import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('sessions', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'sessions-test'])
    .command(['start', 'sessions-test'])
    .command(['stop'])
    .stdout()
    .command(['sessions', 'sessions-test'])
    .do(() => remove('./test/test-config'))
    .it('displays sessions', ctx => {
      expect(ctx.stdout).to.contain('sessions-test')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['sessions'])
    .do(() => remove('./test/test-config'))
    .it('no sessions', ctx => {
      expect(ctx.stdout).to.contain("You haven't logged any sessions today")
    })
})
