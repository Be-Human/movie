const User = require('../models/user')

exports.signup = function (req, res) {
  let _user = req.body.user

  User.findOne({name: _user.name}, function (err, user) {
    if (err) console.log(err)
    if (user) {
      return res.redirect('/signin')
    } else {
      let user = new User(_user)
      user.save(function (err, user) {
        if (err) {
          console.log(err)
        }
        res.redirect('/')
      })
    }
  })
}

exports.signin= function (req, res) {
  let _user = req.body.user
  let name = _user.name
  let password = _user.password
  User.findOne({name: name}, function (err, user) {
    if (err) console.log(err)
    if (!user) {
      console.log(`There is no user named ${name}.`)
      return res.redirect('/signup')
    } else {
      user.comparePassword(password, function (err, isMatch) {
        if (err) console.log(err)

        if (isMatch) {
          console.log('Password is matched')
          req.session.user = user
          res.redirect('/')
        } else {
          console.log('Password is not matched')
          res.redirect('/signin')
        }
      })
    }
  })
}

exports.showSignin = function(req,res){
  res.render('signin', {
    title: '登陆页面',
  })
}

exports.showSignup = function(req,res){
  res.render('signup', {
    title: '注册页面',
  })
}

exports.logout= function (req, res) {
  delete req.session.user
  // delete app.locals.user
  res.redirect('/')
}

exports.list = function(req, res){
  User.fetch(function (err, users) {
    if (err) {
      console.log(err)
    }
    res.render('userlist', {
      title: 'movies 用户列表页',
      users: users
    })
  })
}

//midware for user
exports.signinRequired = function(req, res, next){
  var user = req.session.user
  if (!user) {
    return res.redirect('/signin')
  }
  next()
}

exports.adminRequired = function(req, res, next){
  var user = req.session.user
  if (user.role <= 10) {
    return res.redirect('/signin')
  }
  next()
}
