import {expect, test} from '@oclif/test'
import {remove} from 'fs-extra'

describe('projects', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'project-test'])
    .command(['add', 'project-test2'])
    .stdout()
    .command(['projects'])
    .do(() => remove('./test/test-config'))
    .it('lists projects', ctx => {
      expect(ctx.stdout).to.contain('project-test')
      expect(ctx.stdout).to.contain('project-test2')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['projects'])
    .exit(2)
    .do(() => remove('./test/test-config'))
    .it('exits when there are no project')
})
