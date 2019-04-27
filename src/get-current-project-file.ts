import {join} from 'path'

export async function getCurrentProjectFile(configDir: string) {
  const currentFile = await join(configDir, 'current.json')

  return currentFile
}
