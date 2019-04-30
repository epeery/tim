import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('add', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['add', 'add-test'])
    .it('adds a project', ctx => {
      expect(ctx.stdout).to.contain('add-test')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stderr({print: true})
    .command(['add', 'add-test'])
    .exit(2)
    .do(() => remove('./test/test-config'))
    .it('exits if project already exists')
})
