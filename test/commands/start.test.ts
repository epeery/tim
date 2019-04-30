import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('start', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'start-test'])
    .stdout()
    .command(['start', 'start-test'])
    .it('starts project')

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['start', 'start-test'])
    .do(() => remove('./test/test-config'))
    .it('stops previous project if started', ctx => {
      expect(ctx.stdout).to.contain('Stopped')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['start', 'start-test'])
    .exit(2)
    .do(() => remove('./test/test-config'))
    .it("throws an error if project doesn't exist")
})
