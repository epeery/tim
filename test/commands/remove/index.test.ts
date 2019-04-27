import {expect, test} from '@oclif/test'

describe('remove:index', () => {
  test
    .stdout()
    .command(['remove:index'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['remove:index', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
