const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')
const mongoose = require('mongoose')
const mongoStore = require('connect-mongo')(session)
const _ = require('underscore')
const logger = require('morgan')
const dbUrl = 'mongodb://localhost/movies'

let app = express()
// const port = process.env.PORT || 3000
app.set('port', process.env.PORT || 3000);

mongoose.Promise = global.Promise
mongoose.connect(dbUrl)

// models loading

// var models_path = __dirname + '/app/models'
// var walk = function(path) {
//   fs
//     .readdirSync(path)
//     .forEach(function(file) {
//       var newPath = path + '/' + file
//       var stat = fs.statSync(newPath)
//
//       if (stat.isFile()) {
//         if (/(.*)\.(js|coffee)/.test(file)) {
//           require(newPath)
//         }
//       }
//       else if (stat.isDirectory()) {
//         walk(newPath)
//       }
//     })
// }
// walk(models_path)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: 'movie',
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))

// let env = process.env.NODE_ENV || 'development'
if ('development' === app.get('env')) {
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

require('./config/routes')(app)

app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname, 'public')))
// app.listen(port)
app.listen(app.get('port'))

console.log('imooc started on ' + app.get('port'))
