import {Hook} from '@oclif/config'
import {existsSync, readJSON, remove} from 'fs-extra'

import {getDayFile} from '../../get-day-file'

const hook: Hook<'init'> = async function (opts) {
  const now = new Date()

  const dayFile = await getDayFile(this.config.configDir, now)
  if (existsSync(dayFile)) {
    const day = await readJSON(dayFile)

    if (day.sessions.length === 0) {
      await remove(dayFile)
    }
  }
}

export default hook
