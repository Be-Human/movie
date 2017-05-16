const Comment = require('../models/comment')
const _ = require('underscore')


//save
exports.save = function (req, res) {
  let _comment = req.body.comment
  let movieId = _comment.movie
  console.log(_comment)
  console.log(_comment.cid)
  if (_comment.cid) {
    Comment.findById(_comment.cid, function (err, comment) {
      let reply = {
        from: _comment.from,
        to: _comment.tid,
        content: _comment.content
      }
      console.log(reply)
      comment.reply.push(reply)
      comment.save(function (err, comment) {
        if (err) {
          console.log(err)
        }
        res.redirect('/movie/' + movieId)
      })
    })
  } else {
    let comment = new Comment(_comment)
    comment.save(function (err, comment) {
      if (err) {
        console.log(err)
      }
      res.redirect('/movie/' + movieId)
    })
  }
}
