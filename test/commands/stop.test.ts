import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('stop', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'stop-test'])
    .command(['start', 'stop-test'])
    .stdout()
    .command(['stop'])
    .do(() => remove('./test/test-config'))
    .it('stops active project', ctx => {
      expect(ctx.stdout).to.contain('Stopped tracking: stop-test')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['stop'])
    .exit(2)
    .do(() => remove('./test/test-config'))
    .it('no active project')
})
