'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ApiDocProvider extends ServiceProvider {
  boot () {
    if (process.env.NODE_ENV !== 'development') return

    const Route = use('Adonis/Src/Route')

    Route.get('/api/doc', 'ApiDocController.render')
  }
}

module.exports = ApiDocProvider
