'use strict'

const map = require('../views/map')

module.exports = (app) => {
  app.route('/', map)
}