const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let UserSchema = require('../schemas/user')
let User = mongoose.model('User', UserSchema)

module.exports = User
