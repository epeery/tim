import {join} from 'path'

export async function getProjectDir(configDir: string, project: string) {
  const projectDir = await join(configDir, `/projects/${project}`)

  return projectDir
}
