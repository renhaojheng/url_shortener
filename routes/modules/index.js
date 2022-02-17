const express = require('express')
const router = express.Router()
const Shorten = require('../../models/shorten')
const generateShortURL = require('../../models/generate_shortURL')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const { url } = req.body
  const origin = req.headers.origin
  Shorten.findOne({ inputURL: url })
    .lean()
    .then(shorten => {
      if (!shorten) {
        const shortURL = generateShortURL()
        return Shorten.create({ inputURL: url, outputURL: shortURL })
          .then(res.render('index', { origin, url: shortURL }))
      }
      res.render('index', { origin, url: shorten.outputURL })
    })
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Shorten.findOne({ outputURL: id })
    .lean()
    .then(shorten => {
      if (!shorten) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + id,
        })
      }
      res.redirect(shorten.inputURL)
    })
    .catch(error => console.log(error))
})

module.exports = router