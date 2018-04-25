var dbUrl=process.env.SET_MONGOLAB_URI;  
var mongo = require('mongodb').MongoClient

module.exports = {
  setURL: function (seedData,callback) {
    mongo.connect(dbUrl,function(err,db){
      var coll=db.collection('shortURLs');
      if (err) throw callback(err,null);
      
      coll.find({orig: seedData['orig']},{"_id":0}).limit(1).toArray(function(err, items) {
        if (err) throw callback(err,null);
        if (items.length>0){
          console.log(items[0])
          callback(null,items[0])
          db.close()
        }else{
          coll.find({short: seedData['short']},{"_id":1}).limit(1).toArray(function(err, items) {
            if (items.length>0){
              coll.update({
                  short:seedData['short']
                },{
                  $set:{orig:seedData['orig']}
                },function(err,data){
                  if (err) throw callback(err,null);
                  callback(null,data)
                  db.close()
              })
            }else{
              coll.insert(seedData,function(err,result){
                if (err) throw callback(err,null);
                callback(null,{'short': seedData['short'],'orig': seedData['orig']})
                db.close()
              })
            }
          });
        }
      })
    });
  },
  getURL: function (shortURL,callback) {
    mongo.connect(dbUrl,function(err,db){
      var coll=db.collection('shortURLs');
      if (err) throw err;
      coll.find({short: shortURL},{"_id":1,"orig":1}).limit(1).toArray(function(err, items) {
        if (err) throw callback(err,null);
        if (items.length>0){
          callback(null,items[0]['orig'])
        }else{
          callback(null,'')
          db.close()
        }
      });
    })
  }
};

/*
var dbUrl=process.env.SET_MONGOLAB_URI;  
var mongo = require('mongodb').MongoClient

module.exports = {
  setURL: function (seedData,response,hostURL) {
    mongo.connect(dbUrl,function(err,db){
      var coll=db.collection('shortURLs');
      if (err){
        console.log(err)
        response.send(err)
      }
      coll.find({short: seedData['short']},{"_id":1}).limit(1).toArray(function(err, items) {
        if (items.length>0){
          console.log("find exists")
          coll.update({
              short:seedData['short']
            },{
              $set:{orig:seedData['orig']}
            },function(err,data){
              if (err){
                db.close()
                console.log(err)
                response.send(err)
              }
              seedData['short']='https://acgabor-url-shortener.glitch.me/'+seedData['short']
              console.log(seedData)
              response.send(seedData)
              db.close()
          })
        }else{
          console.log("find not exists")
          coll.insert(seedData,function(err,result){
            if (err) {
              db.close()
              console.log(err)
              response.send(err)
            }
            seedData['short']='https://acgabor-url-shortener.glitch.me/'+seedData['short']
            console.log(seedData)
            response.send(seedData)
            db.close()
          })
        }
      });
    });
  },
  getURL: function (shortURL,response) {
    mongo.connect(dbUrl,function(err,db){
      var coll=db.collection('shortURLs');
      if (err){
        console.log(err)
        response.send(err)
      }
      coll.find({short: shortURL},{"_id":1,"orig":1}).limit(1).toArray(function(err, items) {
        if (err) {
          db.close()
          console.log(err)
          response.send(err)
        }
        console.log(shortURL)
        response.redirect(items["orig"])
        db.close()
      });
    })
  }
};
*/