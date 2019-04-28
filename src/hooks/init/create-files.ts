import {Hook} from '@oclif/config'
import {ensureDir, existsSync, outputJson} from 'fs-extra'

import {getCurrentProjectFile} from '../../get-current-project-file'
import {getProjectsDir} from '../../get-projects-dir'
import {getSessionsDir} from '../../get-sessions-dir'

const hook: Hook<'init'> = async function (opts) {
  const currentProjectFile = await getCurrentProjectFile(this.config.configDir)
  if (!existsSync(currentProjectFile)) {
    await outputJson(currentProjectFile, {})
  }

  const projectsDir = await getProjectsDir(this.config.configDir)
  ensureDir(projectsDir)

  const sessionsDir = await getSessionsDir(this.config.configDir)
  ensureDir(sessionsDir)
}

export default hook
