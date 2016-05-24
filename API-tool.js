function AdhObject(collection, getProperties) {
  this.Collection = collection;
  /*this.Criteria = {},
  this.Fields =  {},
  this.fieldname = function(fieldname, val){
    this.Fields{fieldname,val}
  }
  this.save = Save(this.Collection, this.Fields);*/


  this.Save = function () {
    Fields = {}
    /*for (var property in Object.keys(this)) {
        if (property != "Collection" && property != "S") {
            Fields[property] = this[property];
            console.log(property);
          }
    }*/

    // loop over the properties and them to the Fields JSON
    Object.keys(this).forEach(function(key,index) {
      if (key != "Collection" && key != "Save") {
          Fields[key] = this[key];
        }
    }.bind(this));

    // ajax post call
    data = {"Collection": this.Collection, "Fields": Fields};
    $.ajax({
    dataType: "json",
    type: "POST",
    url: "http://localhost:5000/update",
    data: data,
    success: function (succ) {
        console.log(succ);
    }
  });
}
}
