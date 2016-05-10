var express = require('express')
var app = express()

//Database connection

var mongoose = require('mongoose');
 
mongoose.connect('mongodb://adpillrw:mongo12@ds011248.mlab.com:11248/adherencepill');

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send({'hi': 5})
})
app.post('/update', function(request, response) {

	var data = request.body; //Fetches paramaters from request
	console.log(data['hi']);

	response.send(data);
})
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
