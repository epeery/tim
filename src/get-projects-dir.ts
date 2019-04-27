import {join} from 'path'

export async function getProjectsDir(configDir: string) {
  const projectsDir = await join(configDir, '/projects')

  return projectsDir
}
