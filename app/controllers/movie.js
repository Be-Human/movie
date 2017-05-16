const fs = require('fs')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const Movie = require('../models/movie')
const Comment = require('../models/comment')
const Category = require('../models/category')
const _ = require('underscore')

//detail
exports.detail = function(req,res){
  var id = req.params.id
  Movie.update({_id: id}, {$inc: {pv: 1}}, function (err) {
    if (err) {
      console.log(err)
    }
  })
  Movie.findById(id, function (err, movie) {
    Comment.find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function (err, comments) {
        // console.log(comments)
        res.render('detail', {
          title: 'movie ' + movie.title,
          movie: movie,
          comments: comments
        })
      })
    // res.render('detail', {
    //   title: 'movie ' + movie.title,
    //   movie: movie
    // })
  })

}

//new
exports.new = function (req, res) {
  Category.find({}, function (err, categories) {
    res.render('admin', {
      title: 'imooc 后台录入页',
      categories: categories,
      movie: {}
    })
  })
}

//update
exports.update = function (req, res) {
  let id = req.params.id

  if (id) {
    Movie.findById(id, function (err, movie) {
      Category.find({}, function (err, categories) {
        res.render('admin', {
          title: 'imooc 后台更新页',
          categories: categories,
          movie: movie
        })
      })
    })
  }
}

exports.savePoster = function (req, res, next) {
  console.log(req.file)
  var posterData = req.file
  var filePath = posterData.path
  var filename = posterData.filename

  if (filename) {
    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now()
      var type = posterData.mimetype.split('/')[1]
      // var poster = timestamp + '.' + type
      req.poster = filename
      // var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)
      // console.log(poster)
      // fs.writeFile(newPath, data, function(err) {
      //   console.log(poster)
      //   console.log(req.poster)
      //   req.poster = poster
      //   next()
      // })
      next()
    })
  } else {
    next()
  }

}

//save
exports.save = function (req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie
  console.log(req.poster)
  if (req.poster) {
    movieObj.poster = req.poster
  }

  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err)
      }
      _movie = _.extend(movie, movieObj)
      _movie.save(function (err, movie) {
        if (err) {
          console.log(err)
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  } else {
    _movie = new Movie(movieObj)

    var categoryId = movieObj.category
    var categoryName = movieObj.categoryName

    _movie.save(function (err, movie) {
      if (err) {
        console.log(err)
      }

      if (categoryId) {
         Category.findById(categoryId, function (err, category) {
           category.movies.push(movie._id)
           category.save(function(err, category) {
               res.redirect('/movie/' + movie._id)
           })
         })
       } else if (categoryName) {
         var category = new Category({
          name: categoryName,
          movies: [movie._id]
        })

        category.save(function(err, category) {
          movie.category = category._id
          movie.save(function(err, movie) {
            res.redirect('/movie/' + movie._id)
          })
        })

      } else {
        //no category
      }

    })
  }
}

//list
exports.list = function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('list', {
      title: 'movies 首页',
      movies: movies
    })
  })
}

//delete
exports.delete = function(req, res) {
  var id = req.query.id

  if (id) {
    Movie.remove({_id: id}, function (err, movie) {
      if (err) {
        console.log(err)
      } else {
        res.json({success: 1})
      }
    })
  }
}
