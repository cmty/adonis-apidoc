'use strict'

const path = require('path')
const edge = require('edge.js')

const { ServiceProvider } = require('@adonisjs/fold')

class ApiDocProvider extends ServiceProvider {
  boot () {
    if (process.env.NODE_ENV !== 'development') return

    const Route = use('Adonis/Src/Route')
    const ApiDocController = require('../src/Controllers/ApiDocController')

    Route.get('/api/doc', ApiDocController.render)
  }

  register () {
    edge.registerViews(path.join(__dirname, './views'))
  }
}

module.exports = ApiDocProvider
