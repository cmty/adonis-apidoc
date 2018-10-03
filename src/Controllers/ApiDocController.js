'use strict'

const path = require('path')
const { chain, find, capitalize, upperCase, startsWith, endsWith } = require('lodash')

const Route = use('Adonis/Src/Route')
const Imperium = use('Adonis/Addons/Imperium')

class ApiDocController {
  render ({ view }) {
    const roles = Imperium ? Imperium.roles() : []

    const routes = chain(Route.list())
      .filter((route) => {
        return ['/api/doc'].indexOf(route.name) === -1
      })
      .each((route) => {
        route.id = route.name.replace(/\//g, '.').replace(/^\./, '')

        route.verb = find(route.verbs, (verb) => {
          return ['GET', 'POST', 'PUT', 'DELETE'].indexOf(verb) !== -1
        })

        const names = route.name.split('.')

        route.action = names[names.length - 1]
        route.resource = names[names.length - 2]

        if (names.length > 1) {
          route.action = upperCase(route.action)
          route.resource = capitalize(route.resource.replace('_', ' '))

          if (endsWith(route.resource, 'ies')) route.resource = route.resource.replace(/ies$/, 'y')
          else if (endsWith(route.resource, 's')) route.resource = route.resource.replace(/s$/, '')
        }

        route.auth = route.middlewareList.indexOf('auth') !== -1

        const can = find(route.middlewareList, (middlewareName) => startsWith(middlewareName, 'can'))
        const is = find(route.middlewareList, (middlewareName) => startsWith(middlewareName, 'is'))
        const av = find(route.middlewareList, (middlewareName) => startsWith(middlewareName, 'av'))

        if (can) route.can = can.split(':')[1]
        if (is) route.is = is.split(':')[1]
        if (av) {
          const Validator = use(`App/Validators/${av.split(':')[1]}`)
          const instance = new Validator()

          route.rules = instance.rules
        }
      })
      .groupBy((route) => {
        const name = route.name
          .replace('.index', '')
          .replace('.show', '')
          .replace('.store', '')
          .replace('.update', '')
          .replace('.destroy', '')

        return name
      })
      .value()

    return view.render(path.join(__dirname, './views/apidoc.edge'), { routes, roles })
  }
}

module.exports = ApiDocController
