var express = require('express')
var app = express()
var Parse = require('parse/node').Parse; // module to use parsa javascript sdk

// our parse project
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

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

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    //res.setHeader('Cache-Control', 'no-cache');
    next();
});

var Schema = mongoose.Schema;

// schemas for most existing collections
// using string formats for pointers, not sure if correct
var MessageSchema = new Schema({
  //_id: String,
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_addressee: String,
  _p_sender: String,
  subject: String,
  text: String
},
{collection: 'Message'});

var BottleSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  UUID: String,
  BatteryCharge: String,
  weight: String
},
{collection: 'Bottle'});

var DoctorSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  address: String,
  hospitalName: String,
  hospitalCity: String,
  _p_userAccount: String
},
{collection: 'Doctor'});

var ImageSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  UUID: String,
  image: String
},
{collection: 'Image'});

var ImageStorageDevSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  Image: String
},
{collection: 'ImageStorageDev'});

var PatientSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_userAccount: String
},
{collection: 'Patient'});

var PillLibSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  pillInfo: String,
  pillName: String,
  pillInstruction: String
},
{collection: 'PillLib'});

var PrescriptionSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_bottle: String,
  pillName: String,
  _p_schedule: String,
  _p_patientID: String
},
{collection: 'Prescription'});

var ScheduleSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_Drug: String,
  Monday: {},
  Tuesday:{},
  Wednesday:{},
  Thursday:{},
  Friday:{},
  Saturday:{},
  Sunday:{}
},
{collection: 'Schedule'});




// needed for dates (updatedat etc)
/*var now = new Date();
var jsonDate = now.toJSON();

// example of how to save to Mongo
var Message = mongoose.model('Message', MessageSchema);
var newMess  = new Message({
  _p_addressee: "Yo",
  _p_sender: "Yo",
  subject: "Test ",
  text: "Test",
  _created_at: jsonDate,
  _updated_at: jsonDate
});

newMess.save(function (err) {
  if (err) console.log(err);
})*/
app.get ('/', function (request, response) {
  var data = (request.query);
  var schemaObject = data['Collection'] + 'Schema'; // same deal as below
  var newColl = mongoose.model(data['Collection'], eval(schemaObject)); // " "
  var query = newColl.findOne(data['Criteria']); // create new query with specified criteria
  query.select(data['FieldsToRetrieve']); // OMIT if want all fields
  query.exec(function (err, result) {
    if (err) {
      return handleError(err);
    }
    response.send(result);
  })
})
app.post('/retrieve', function(request, response) {
  // this is the json query I used
  // {"collection": "Message", "Criteria": {"subject": "Test "}, "FieldsToRetrieve": "text"}
  var data = (request.body);
  var schemaObject = data['Collection'] + 'Schema'; // same deal as below
  var newColl = mongoose.model(data['Collection'], eval(schemaObject)); // " "
  var query = newColl.findOne(data['Criteria']); // create new query with specified criteria
  query.select(data['FieldsToRetrieve']); // OMIT if want all fields
  query.exec(function (err, result) {
    if (err) {
      return handleError(err);
    }
    response.send(result);
  })
})

app.post('/update', function(request, response) {
  var data = (request.body);
  // This is the json I used to test:
  // {"collection": "User", "Fields": {"username": "MONGO@mongo.msngo", "password": "xD",
  // "email": "MONGO@mongo.mongos", "phone": "3234asd23333", "firstname": "jacky",
  // "lastname": "baley", "gender": "Male"}}

  if (data['Collection'] == "User") {
      var newUser = new Parse.User(); // new Parse User
      // run a loop on each field in the JSON
      for (var field in data['Fields'])
      {
        // set the appropriate field in the Parse User object
        newUser.set(field, data['Fields'][field]);
      }
      // save Parse User
      newUser.save();
  }
  else {
    // new Schema object, take collection from JSON and add Schema
    var Valid = true;
    var schemaObject = data['Collection'] + 'Schema';
    // new Collection object
    var newColl = mongoose.model(data['Collection'], eval(schemaObject));
    var now = new Date(); // take current date
    var jsonDate = now.toJSON();
    var newObject = new newColl({ // new object
      _created_at: jsonDate, // set dates
      _updated_at: jsonDate
    });
    var schemafields = eval(schemaObject).paths

    for (var field in data['Fields']) // go through fields in JSON
    {
      newObject[field] = data['Fields'][field]; // set them in the new object
     if (!(field in schemafields)){
         response.send("Error: " + field + " does not exist in the " + data["Collection"] + " table");
         Valid = false;
      }
    }

    // save new object
    newObject.save(function (err) {
      if (err) {
        if (Valid) {
           Valid = false;
           var error = err["errors"];
           var errorKeys = Object.keys(error);
           response.send(err["errors"][errorKeys[0]]);
           }
      }
      else{
        if (Valid){
          var res = {
            status: 200,
            success : 'Updated Successfully'};

          response.end(JSON.stringify(res));
        }
      }
    })
    }


})
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
