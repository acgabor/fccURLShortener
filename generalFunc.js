/*
var dbFunc=require('./dbFunc');

module.exports = {
  processURL: function (request,response) {
    var param=request.params['0']
    console.log(param)
    if (/^\d+$/.test(param)){
      console.log(param)
      console.log('1')
      dbFunc.getURL(param,response)
    }else if (/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(param)){
      var shortURL=(Math.floor(Math.random() * 1000) + 1).toString();
      console.log('2')
      var seedData={"short": shortURL , "orig": param};
      var hostURL=request.headers.host
      //response.send(seedData)
      dbFunc.setURL(seedData,response,hostURL)   
    }else{
      console.log('3')
      response.send({"error": param.toString() + " is not a valid url"})         
     }
    
  },
};
*/