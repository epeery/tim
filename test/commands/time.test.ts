import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('time', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'time-test'])
    .command(['start', 'time-test'])
    .command(['stop', 'time-test'])
    .stdout()
    .command(['time'])
    .do(() => remove('./test/test-config'))
    .it('displays project time', ctx => {
      expect(ctx.stdout).to.contain('time-test')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['time'])
    .do(() => remove('./test/test-config'))
    .it('says that nothing is tracked', ctx => {
      expect(ctx.stdout).to.contain("You haven't logged any sessions today")
    })
})
