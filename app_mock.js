const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000

let app = express()


app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on ' + port)

app.get('/',function(req,res){
	res.render('index',{
		title:'movies 首页',
		movies:[{
			title:'jerry',
			poster:'./assets/images/001.png',
			_id:1
		},{
			title:'jerry',
			poster:'./assets/images/001.png',
			_id:1
		},{
			title:'jerry',
			poster:'./assets/images/002.png',
			_id:1
		},{
			title:'jerry',
			poster:'./assets/images/003.png',
			_id:1
		},{
			title:'jerry',
			poster:'./assets/images/001.png',
			_id:1
		},{
			title:'jerry',
			poster:'./assets/images/003.png',
			_id:1
		}]
	});
});


app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'movies 详情页',
		movie:{
			_id:1,
			title: '机械战警',
			director:'何塞.帕迪利亚',
			year:2014,
			country:'美国',
			language:'英语',
			poster: './assets/images/001.png',
			flash: 'http://player.youku.com/player.php/sid/XMTI4MDkyODA=/v.swf',
			summary:'Yes , you know what , i am the Summary for this!!'
		}
  });
})

app.get('/list',function(req,res){
	res.render('list',{
		title:'list 页',
		movies:[{
		    _id:1,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2014,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/002.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'我是描述我是描述我是描述我'
		},{
		    _id:2,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2012,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/001.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'我是描述我是描述我是描述'
		},
		{
		    _id:2,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2012,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/001.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'我是描述我是描述我是描述'
		}]
	});
});


app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

app.get('/admin/list', function (req, res) {
  res.render('list', {
    title: 'imooc 列表页',
    movies:[{
		    _id:1,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2014,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/002.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'我是描述我是描述我是描述我'
		},{
		    _id:2,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2012,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/001.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'我是描述我是描述我是描述'
		},
		{
		    _id:2,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2012,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/001.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'我是描述我是描述我是描述'
		}]
  });
});
