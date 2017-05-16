const Movie = require('../models/movie')
const Category = require('../models/category')

//index
exports.index = function (req, res) {
  console.log('session in user:')
  console.log(req.session.user)
  Category
    .find({})
    .populate({
      path: 'movies',
      select: 'title poster',
      options: {limit: 6}
    })
    .exec(function (err, categories) {
      if (err) {
        console.log(err)
      }
      res.render('index', {
        title: 'movies 首页',
        categories: categories
      })
    })
  // Movie.fetch(function (err, movies) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   res.render('index', {
  //     title: 'movies 首页',
  //     movies: movies
  //   })
  // })
}

//search
exports.search = function (req, res) {
  var catId = req.query.cat
  var q = req.query.q
  var page = parseInt(req.query.p, 10) || 0
  var count = 2
  var index = page * count
  if (catId) {
    Category
      .find({_id: catId})
      .populate({
        path: 'movies',
        select: 'title poster',
        // options: {limit: 2, skip: index}
      })
      .exec(function (err, categories) {
        if (err) {
          console.log(err)
        }
        var category = categories[0] || {}

        var movies = category.movies || []
        var results = movies.slice(index, index + count)

        res.render('results', {
          title: 'movies 搜索结果',
          keyword: category.name,
          query: 'cat=' + catId,
          currentPage: (page + 1),
          totalPage: Math.ceil(movies.length / 2),
          movies: results
        })
      })
  } else {
    Movie.find({title: new RegExp(q + '.*', 'i')})
    .exec(function (err, movies) {
      if (err) {
        console.log(err)
      }

      var results = movies.slice(index, index + count)

      res.render('results', {
        title: 'movies 搜索结果',
        keyword: q,
        query: 'q=' + q,
        currentPage: (page + 1),
        totalPage: Math.ceil(movies.length / 2),
        movies: results
      })
    })
  }

}
