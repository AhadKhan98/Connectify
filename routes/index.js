var express = require('express');
var router = express.Router();
const database = require('../models/firebase');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signUp', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/signUp', function(req, res, next) {
  const username=req.body.username;
  const email=req.body.email;
  const password = req.body.password;
  const subjects = req.body.subjects;
  const online = req.body.online;
  const user={username,email,password,subjects,online}
  database.ref('users').push(user).then((ref)=>{
    res.send(200)
  }).catch((err)=>{
    res.send(err)
  })
});

module.exports = router;
