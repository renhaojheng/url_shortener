const express = require('express')
const exphbs = require('express-handlebars')
const shorten = require('./models/shorten')
const Shorten = require('./models/shorten')

monogoose = require('./config/mongoose')
const generateShortURL = require('./models/generate_shortURL')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
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

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})