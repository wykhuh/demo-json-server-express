var express = require('express');
var axios = require('axios');
var app = express();

var env = process.env.NODE_ENV || 'development';
// use dotenv in development
if(env === 'development') {
  console.log('boo')
  require('dotenv').config()
}

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  axios.get(process.env.API_URL + 'users')
  .then(function(response){
    var users = response.data;
    res.send(users)
  })
  .catch(function(err) {
    console.log('ERROR:', err)
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server staring port 3000');
});
