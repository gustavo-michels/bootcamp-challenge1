const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query
  if (!age) {
    return res.redirect('/')
  }
  return next()
}

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    return res.redirect(`/major/?age=${age}`)
  } else {
    return res.redirect(`/minor/?age=${age}`)
  }
})

app.get('/major', checkAgeQueryParam, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', checkAgeQueryParam, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3000)
