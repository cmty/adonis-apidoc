'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ApiDocProvider extends ServiceProvider {
  register () {
    this.app.bind('Cmty/Controllers/ApiDocController', function () {
      const ApiDocController = require('../src/Controllers/ApiDocController')
      return new ApiDocController()
    })
  }

  boot () {
    if (process.env.NODE_ENV !== 'development') return

    const Route = use('Adonis/Src/Route')
    Route.get('/api/doc', 'Cmty/Controllers/ApiDocController.render')
  }
}

module.exports = ApiDocProvider
