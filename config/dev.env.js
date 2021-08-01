'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FRONTEND_PORT: 3000,
  BACKEND_DOMAIN: null,
  BACKEND_PORT: 8080,
})
