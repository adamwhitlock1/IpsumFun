import { ipsumRequest } from './ipsumRequest'
import { loadDict } from './loadDict'
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

const dicts = loadDict()
async function getDictArray(router) {
  const dictArrays = {}
  for (const key in dicts.filenames) {
    if (dicts.filenames.hasOwnProperty(key)) {
      dictArrays[key] = await import(
        process.cwd() + '/server/dictionary/' + dicts.filenames[key]
      )
    }
  }
  return dictArrays
}

let allDicts = {}
let dictNames = []
getDictArray()
  .then((dicts) => {
    allDicts = dicts
    dictNames = Object.keys(allDicts)
  })
  .catch((err) => {
    console.error(err)
  })

router.get('/type/:type', (req, res) => {
  console.log(req.query)
  if (dictNames.includes(req.params.type)) {
    console.log(req.params.type)
    ipsumRequest(req, res, allDicts[req.params.type].dict)
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'That type does not exist... yet'
    })
  }
})

router.get('/categories', (req, res) => {
  res.status(200).json({ categories: dictNames })
})

consola.ready({
  message: `API is running`,
  badge: true
})

module.exports = {
  path: '/api',
  handler: router
}
