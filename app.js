var express = require('express')
var path = require('path')
var router = require('./router')
var session = require('express-session')
var bodyParser = require('body-parser')

var app = express()

// 设置静态文件
app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))

// 配置模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, '/views/')) // 默认就是 ./views 目录

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(session({
  secret: 'itcast',
  resave: false,
  saveUninitialized: false 
}))


// 把路由挂载到 app 中
app.use(router)

// 配置一个处理 404 的中间件
app.use(function (req, res) {
	res.render('404.html')
})

// 配置全局错误处理
app.use(function (err, req, res, next) {
	res.status(500).json({
		err_code: 500,
		message: "服务端错误。"
	})
})

app.listen(3000, function () {
	console.log('3000 running...')
})