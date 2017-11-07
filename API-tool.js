function AdhObject(collection, getProperties) {
  this.Collection = collection;

  this.fieldsToJson = function() {
    data = {};
    // loop over the properties and convert them to JSON
    Object.keys(this).forEach(function(key,index) {
      if (key != "Collection" && key != "Save" && key != "Get" && key != "fieldsToJson" && key != "GetLayout")
          data[key] = this[key];
    }.bind(this));
    return data;
  }

  this.Save = function () {
    Fields = this.fieldsToJson();
    // ajax post call

    data = {"Collection": this.Collection, "Fields": Fields};
    console.log(data);
    $.ajax({
      dataType: "json",
      type: "POST",
      url: "http://localhost:5000/save",
      data: data,
      success: function (succ) {
          console.log(succ);
      },
      error: function (t, b, err){
        console.log(t);
      }
    });
  }
  this.Get = function () {
    obj = {}
    Criteria = this.fieldsToJson();
    data={"Collection": this.Collection, "Criteria": Criteria};
    $.ajax({
      dataType: "json",
      async: false,
      type: "GET",
      url: "http://localhost:5000/",
      data: data,
      success: function (result) {
        obj = result
      }
    });

    Object.keys(obj).forEach(function(key,index) {
      this[key] = obj[key]
    }.bind(this))

    console.log(this);
  }

  this.GetLayout = function () {
    // passing collection name
    data = {"Collection": this.Collection}
    $.ajax({
      dataType: "json",
      type: "GET",
      url: "http://localhost:5000/getSchema",
      data: data,
      success: function (result) {
          console.log(result);
      },
      error: function (msg, b, err){
        console.log(msg);
      }
    });
  }


}

module.exports = AdhObject;
