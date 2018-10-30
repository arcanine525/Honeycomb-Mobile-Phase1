var fs = require("fs");
var express = require("express");
var app = express();
app.listen(process.env.PORT || 8080);

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/api/getassets", function(req, res) {
  let data = require("./assets.json");
  console.log("Get all assets");
  res.send(data);
});

app.get("/api/getzones", function(req, res) {
  let data = require("./zones.json");
  console.log("Get all zones");
  res.send(data);
});

app.get("/api/getreports", function(req, res) {
  let data = require("./reports.json");
  console.log("Get all reports");
  res.send(data);
});

app.get("/api/gethistory", function(req, res) {
  let data = require("./history.json");
  console.log("Get history");
  res.send(data);
});

app.post("/api/addasset", function(req, res) {
  let newdata = {
    type: req.body.newAsset.type,
    zone: req.body.newAsset.zone,
    id: req.body.newAsset.id,
    supplier: req.body.newAsset.supplier,
    price: req.body.newAsset.price,
    owner: req.body.newAsset.owner,
    buydate: req.body.newAsset.buydate,
    expiredate: req.body.newAsset.expiredate,
    status: req.body.newAsset.status
  };
  var obj = require("./assets.json");
  obj.push(newdata);

  fs.writeFile("assets.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });

  console.log("New Asset added");
  console.log(req.body);
});

app.post("/api/deleteasset", function(req, res) {
  let deletedData = {
    type: req.body.deletedData.type,
    zone: req.body.deletedData.zone,
    id: req.body.deletedData.id,
    supplier: req.body.deletedData.supplier,
    price: req.body.deletedData.price,
    owner: req.body.deletedData.owner,
    buydate: req.body.deletedData.buydate,
    expiredate: req.body.deletedData.expiredate,
    status: req.body.deletedData.status
  };

  var obj = require("./assets.json");

  for (var i = 0; i < obj.length; i++) {
    if (obj[i].id == deletedData.id) {
      obj.splice(i, 1);
    }
  }

  fs.writeFile("assets.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });

  console.log("Deleted Asset");
  console.log(req.body);
});

app.post("/api/addzone", function(req, res) {
  let newdata = {
    Name: req.body.newZone.Name,
    Floor: req.body.newZone.Floor,
    ID: req.body.newZone.ID
  };

  var obj = require("./zones.json");
  obj.push(newdata);

  fs.writeFile("zones.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });
  res.send("Added");
  console.log("New Zones added");
  console.log(req.body);
});

app.post("/api/deletezone", function(req, res) {
  var obj = require("./zones.json");
  for (var i = 0; i < Object.keys(obj).length; i++) {
    console.log(obj[i].ID);
    console.log("Param: ", req.body.params.ID);
    if (req.body.params.ID == obj[i].ID) {
      console.log(true);
      obj.splice(i, 1);
      break;
    }
  }
  console.log(obj);

  fs.writeFile("zones.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });
  res.send("Deleted");
  console.log(req.body);
});

app.post("/api/addreport", function(req, res) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "-" + mm + "-" + yyyy;

  let newdata = {
    id: req.body.newReport.asset_id + Math.random(),
    type: req.body.newReport.type,
    priority: req.newReport.priority,
    asset_id: req.newReport.asset_id,
    status: "pending",
    comment: "",
    zone: req.newReport.zone,
    date: today
  };

  var obj_history = require("./history.json");
  obj_history.push(newdata);

  fs.writeFile("history.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });

  var obj_reports = require("./reports.json");
  obj_reports.push(newdata);

  fs.writeFile("reports.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });

  res.send("Added" + req.newReport);
  console.log("New Zones added");
  console.log(req.body);
});

app.post("/api/additemchecking", function(req, res) {
  let data = {
    zone: req.body.data.zone,
    id: req.body.data.id,
    status: req.body.data.status,
  };

  let month = req.body.data.month;

  var obj = require("./MonthlyCheckingData.json");
  
  for(var i = 0;i < obj.length;i ++){
    if(obj[i].month == month){
      obj[i].assetList.push(data);
      break;
    }
  }

  fs.writeFile("./MonthlyCheckingData.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });

  console.log("New Item added to check list");
  console.log(req.body);
});

app.post("/api/addzonechecking", function(req, res) {
  let data = {
    id: req.body.data.id,
    name: req.body.data.name,
    floor: req.body.data.floor,
    date: req.body.data.date,
  };
  var obj = require("./MonthlyCheckingData.json");
  obj.push(data);

  fs.writeFile("./MonthlyCheckingData.json", JSON.stringify(obj), function(err) {
    console.log(err);
  });

  console.log("New Zone added to check list");
  console.log(req.body);
});

console.log("SERVER IS RUNNING");
