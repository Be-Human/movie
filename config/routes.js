const Index = require('../app/controllers/index')
const Movie = require('../app/controllers/movie')
const User = require('../app/controllers/user')
const Comment = require('../app/controllers/comment')
const Category = require('../app/controllers/category')
const multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  // filename: function (req, file, cb) {
  //   cb(null, file.fielname + '.' + file.mimetype.split('/')[1]);
  // }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: 'public/uploads/' })

module.exports = function (app) {
  //pre handle user
  app.use(function (req, res, next) {
    let _user = req.session.user
    app.locals.user = _user

    next()
  })

  //Index
  app.get('/', Index.index)

  //User
  app.post('/user/signup', User.signup)
  app.post('/user/signin', User.signin)
  app.get('/signin', User.showSignin)
  app.get('/signup', User.showSignup)
  app.get('/logout', User.logout)
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

  //Movie
  app.get('/movie/:id', Movie.detail)
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
  app.post('/admin/movie', upload.single('uploadPoster'), User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save)
  app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.delete)

  //Comment
  // app.post('/comment/:id', Comment.detail)
  app.post('/user/comment', User.signinRequired, Comment.save)

  //Category
  app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
  app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
  app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

  app.get('/results', Index.search)

}
