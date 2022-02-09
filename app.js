const express = require('express')
const exphbs = require('express-handlebars')
const Shorten = require('./models/shorten')

monogoose = require('./config/mongoose')

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
  return Shorten.create({ inputURL: url })
    .then(shorten => res.render('show', { url: shorten.inputURL }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})