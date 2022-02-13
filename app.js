const express = require('express')
const exphbs = require('express-handlebars')

monogoose = require('./config/mongoose')
const routes = require('./routes')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})