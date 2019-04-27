import {readdirSync} from 'fs-extra'
import {join} from 'path'

export async function getProjects(configDir: string) {
  const projectDir = join(configDir, '/projects/')
  const projects = readdirSync(projectDir)

  return projects
}
