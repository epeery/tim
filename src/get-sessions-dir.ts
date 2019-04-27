import {join} from 'path'

export async function getSessionsDir(configDir: string) {
  const projectsDir = await join(configDir, '/sessions')

  return projectsDir
}
