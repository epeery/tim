import {filter as fuzzyFilter} from 'fuzzy'
import {prompt, registerPrompt} from 'inquirer'

import {getProjects} from './get-projects'

export async function autocompleteProject(configDir: string, noProjectsHandler: () => void) {
  const projects = await getProjects(configDir)

  function searchProjects(answers: any, input: string) {
    input = input || ''
    return new Promise(function (resolve) {
      let fuzzyResult = fuzzyFilter(input, projects)
      resolve(
        fuzzyResult.map(function (el) {
          return el.original
        })
      )
    })
  }

  if (projects.length > 0) {
    registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

    let responces: any = await prompt({
      type: 'autocomplete',
      name: 'project',
      message: 'select a project',
      source: searchProjects,
    })

    return responces.project

  } else {
    noProjectsHandler()
  }
}
