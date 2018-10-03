'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ApiDocProvider extends ServiceProvider {
  boot () {
    if (process.env.NODE_ENV !== 'development') return

    const Route = use('Adonis/Src/Route')
    const ApiDocController = require('../src/Controllers/ApiDocController')

    const handler = new ApiDocController()

    Route.get('/api/doc', handler.render)
  }
}

module.exports = ApiDocProvider
