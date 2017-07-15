var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var app = express();

var env = process.env.NODE_ENV || 'development';
// use dotenv in development
if(env === 'development') {
  require('dotenv').config()
}

app.set('view engine', 'ejs');

// bodyParser is require to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

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

// edit existing user
app.post('/users/:id/update', function(req, res, next) {
  // get new name  from the form
  var newName = req.body.name;

  // get user id from the url
  var id = req.params.id;

  var url = process.env.API_URL + 'users/' + id;

  // send the newName to the api to update the user
  axios.put(url, { name: newName} )
  .then(function(response){
    // get data from api
    var user = response.data;

    // redirect to /users/:id
    res.redirect('/users/' + id )
  })
  .catch(function(err) {
    console.log('ERROR:', err)
    next();
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server staring port 3000');
});
