import { photoRequest } from './photo'
const express = require('express')
const router = express.Router()
const app = express()
const consola = require('consola')

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/photo', (req, res) => {
  consola.info({
    message: 'PHOTO API ENDPOINT HIT 📸',
    badge: true
  })
  photoRequest(req, res, 'all the words')
})

consola.ready({
  message: `API is running`,
  badge: true
})

module.exports = {
  path: '/api',
  handler: router
}
