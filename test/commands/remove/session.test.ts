import {expect, test} from '@oclif/test'
import {readdirSync, remove, writeJson} from 'fs-extra'

let dayFile: string

let newDayFile = {
  date: '2019-04-30T17:03:13.408Z',
  sessions: [
    {
      name: 'remove-test',
      start: '2019-04-30T17:03:11.101Z',
      end: '2019-04-30T17:03:13.408Z',
      time: 2307,
      notes: [],
      id: 'q-yJFEggG'
    }
  ]
}

describe('remove:session', () => {
  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .command(['add', 'remove-test'])
    .command(['start', 'remove-test'])
    .command(['stop'])
    .do(() => dayFile = readdirSync('./test/test-config/tim-time/sessions')[0])
    .do(() => writeJson(`./test/test-config/tim-time/sessions/${dayFile}`, newDayFile))
    .stdout()
    .command(['remove:session', 'q-yJFEggG', '-c'])
    .do(() => remove('./test/test-config'))
    .it('removes session', ctx => {
      expect(ctx.stdout).to.contain('Removed session with ID: q-yJFEggG')
    })

  test
    .env({XDG_CONFIG_HOME: './test/test-config'})
    .stdout()
    .command(['remove:session', 'blah'])
    .do(() => remove('./test/test-config'))
    .it('no sessions', ctx => {
      expect(ctx.stdout).to.contain("You haven't logged any sessions today")
    })
})
