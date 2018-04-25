// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//var generalFunc = require('./generalFunc');
var dbFunc=require('./dbFunc');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function (request, response) {  
    var param=request.params['0']
    if (/^\d+$/.test(param)){
      dbFunc.getURL(param,function(err,data){
        if (err) throw err;
        if (data==''){
          response.send({"error":"This url can not be found in database"})
        }else{
          response.redirect(data)
        }
      })              
    }else if (/(https?):\/\/(www.)(\S+|[0-9]+)\.\S+(\/*)?/.test(param)){
      var shortURL=(Math.floor(Math.random() * 1000) + 1).toString();
      var seedData={"short": shortURL , "orig": param};
      var hostURL=request.headers.host
      dbFunc.setURL(seedData,function(err,data){
        if (err) throw err;
        data['short']=hostURL+'/'+data['short']
        response.send(data)
      })  
    }else{
      response.send({"error": param.toString() + " is not a valid url"})         
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
