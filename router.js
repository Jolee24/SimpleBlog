var express = require('express')
var User = require('./models/user')
var Topic = require('./models/topic')
var md5 = require('blueimp-md5')
var router = express.Router()

router.get('/', function (req, res, next) {
	res.render('index.html', {
		user: req.session.user
	})
})

router.get('/api', function (req, res, next) {
	User.find({}, function (err, data) {
		if (err) {
			return next(err)
		}
		res.send({message: data})
	})

})

router.get('/login', function (req, res, next) {

	res.render('login.html')
})

router.post('/login', function (req, res, next) {
  var body = req.body
  console.log(body)
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      return next(err)
    }
    
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.get('/register', function (req, res, next) {
	
	res.render('register.html')
})

router.post('/register', function (req, res, next) {
	var body = req.body
	User.findOne({
		$or:[
			{email: body.email},
			{nickname: body.nickname}
		]
	}, function (err, data) {
		if (err) {
			return next(err)
		}
		if (data) {
			// 邮箱或者昵称已存在
			return res.status(200).json({
				err_code: 1,
				message: "邮箱或者昵称已存在"
			})
		}
		body.password = md5(md5(body.password))
		new User(body).save(function (err, user) {
	      if (err) {
	        return next(err)
	      }
	      // 注册成功，使用 Session 记录用户的登陆状态
	      req.session.user = user

	      res.status(200).json({
	        err_code: 0,
	        message: 'OK'
	      })
	    })
	})
})

// 发起
router.get('/topics/new', function (req, res, next) {
	res.render('topic/new.html')
})

router.post('/topics/new', async function (req, res, next) {
	var bodyTopic = req.body
	new Topic(bodyTopic).save(function (err, data) {
		if (err) {
			return next(err)
		}
		res.status(200).json({
			err_code: 0,
			message: "OK"
		})
	})
})

router.get('/logout', function (req, res, next) {
	req.session.user = null
	//delete req.session.user
	res.redirect('/login')
})

module.exports = router
