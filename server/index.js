'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const ecstatic = require('ecstatic')
const path = require('path')

const app = express()
const router = express.Router()

app.set('port', 3000)
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()
})

app.all('/_hc', (req, res) => {
  res.end()
})

router.use('/', require('./routes/index'))

app.use(router)

app.use(ecstatic({ root: __dirname + '/../public' }))

router.use('*', (req, res, next) => {
  if (req.baseUrl.indexOf('.') > -1) {
    return next()
  }

  const routes = [
    new RegExp('/reviewTasks'),
  ]

  const match = routes.some(route => {
    return route.test(req.baseUrl)
  })

  if (match) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'))
  } else {
    return next()
  }
})

app.listen(3000, () => {
  console.info(`Server listening on port 3000`)
})

app.use((err, req, res, next) => {
  if (err) {
    console.error('Error occurred: ', err)
    res.statusCode = 500
    return res.send(err)
  }

  res.end()
  return next()
})

module.exports = app