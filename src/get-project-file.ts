import {join} from 'path'

export async function getProjectFile(configDir: string, project: string) {
  const projectFile = await join(configDir, `/projects/${project}/project.json`)

  return projectFile
}
