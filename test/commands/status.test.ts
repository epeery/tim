import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('status', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'status-test'])
    .command(['start', 'status-test'])
    .stdout()
    .command(['status'])
    .do(() => remove('./test/test-config'))
    .it('displays tracking status', ctx => {
      expect(ctx.stdout).to.contain('The project "status-test" was started at')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['status'])
    .do(() => remove('./test/test-config'))
    .it('no active project', ctx => {
      expect(ctx.stdout).to.contain('No active project')
    })
})
