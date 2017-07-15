var express = require('express');
var axios = require('axios');
var app = express();

var env = process.env.NODE_ENV || 'development';
// use dotenv in development
if(env === 'development') {
  require('dotenv').config()
}

app.set('view engine', 'ejs');

app.get('/', function(req, res, next){
  // connect to api and get all users
  axios.get(process.env.API_URL + 'users')
  .then(function(response){
    // get data from api
    var users = response.data;

    // render template with api data
    res.render('home', { users: users } )
  })
  .catch(function(err) {
    console.log('ERROR:', err);
    next();
  })
})

app.get('/users/:id', function(req, res, next){
  // connect to api and get one user
  axios.get(process.env.API_URL + 'users/' + req.params.id )
  .then(function(response){
    // get data from api
    var user = response.data;

    // render template with api data
    res.render('user', { user: user } )
  })
  .catch(function(err) {
    console.log('ERROR:', err)
    next();
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server staring port 3000');
});
