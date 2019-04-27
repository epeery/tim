import * as dateFormat from 'dateformat'
import {join} from 'path'

export async function getDayFile(configDir: string, date: Date) {
  const day = dateFormat(date, 'yyyy-mm-dd')
  const projectFile = await join(configDir, `/sessions/${day}.json`)

  return projectFile
}
