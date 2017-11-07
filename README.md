# Object Oriented Query Tool
An object oriented database query tool using JavaScript. 
## Querying Find/Create Using JavaScript Object

```JavaScript
  // Import into JavaScript File
  var x = document.createElement('script');
  x.src = 'http://example.com/test.js';
  document.getElementsByTagName("head")[0].appendChild(x);
  
  // Import into Node.Js
  var AdhObject = require("API-tool.js");
  
  
  //create an instance of the class with Target collection set to Pill lib
  var pill = new AdhObject("PillLib");
 
  pill.GetLayout();  // print the schema for the PillLib collection.
  
  // Set the desired fields In The Collection
  pill.pillName = "Vitrum";
  pill.pillInfo = "Some Info";
  
  // save the object
  pill.Save(); //Adds document to pillLib collection with attributes "pillName" and "pillInfo". 
                // Set to explicit values set on the object.
               
  var getPill = new AdhObject("PillLib");
  
  // Sets the parameter you would like to query with
  getPill._id = "575c79646a2dcf322b17c093";
  
  // Search for a Pill in the pill lib with an _id = "575c79646a2dcf322b17c093"
  getPill.Get();
  
  // Change values in document retrieved from the collection. 
  getPill.pillInfo = "Final passover";
  getPill.Save(); //Saves to existing document in the collection or creates a new one. 
  
```

A Node.js app using [Express 4](http://expressjs.com/).
## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/corpulentgowk/Adherence-RestAPI.git # or clone your own fork
cd Adherence-RestAPI
npm install
npm install parse
npm install mongoose
npm install body-parser
npm install multer
npm start
```

The adherence API should now be running on [localhost:5000](http://localhost:5000/).

## Using the JavaScript Tool

Include "API-tool.js" in the HTML or JavaScript file that you intend to use to iteract with database. 
