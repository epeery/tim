import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('remove:index', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'remove-test'])
    .stdout()
    .command(['remove', 'remove-test', '-c'])
    .do(() => remove('./test/test-config'))
    .it('removes project', ctx => {
      expect(ctx.stdout).to.contain('The project "remove-test" was removed')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['remove', 'remove-test', '-c'])
    .exit(2)
    .do(() => remove('./test/test-config'))
    .it('exits if no project exists')
})
