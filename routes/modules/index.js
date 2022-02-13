const express = require('express')
const router = express.Router()
const Shorten = require('../../models/shorten')
const generateShortURL = require('../../models/generate_shortURL')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/shorten', (req, res) => {
  const { url } = req.body
  Shorten.findOne({ inputURL: url })
    .lean()
    .then(shorten => {
      if (!shorten) {
        const shortURL = generateShortURL()
        return Shorten.create({ inputURL: url, outputURL: shortURL })
          .then(res.render('show', { url: shortURL }))
      }
      res.render('show', { url: shorten.outputURL })
    })
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Shorten.findOne({ outputURL: id })
    .lean()
    .then(shorten => res.redirect(`${shorten.inputURL}`))
    .catch(error => console.log(error))
})

module.exports = router