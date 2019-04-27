import {expect, test} from '@oclif/test'

describe('remove:session', () => {
  test
    .stdout()
    .command(['remove:session'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['remove:session', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
