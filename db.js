const {MongoClient} = require('mongodb');

let uri = "mongodb://127.0.0.1:27017/countries_api";

let dbConnection; //late initialization

module.exports = {
    connectToDB: (callBack)=>{
        MongoClient.connect(uri)
        .then((client)=>{
            dbConnection = client.db();
            return callBack(); //returns empty
        })
        .catch((err)=>{
            console.log("Couldn't connect to database");
            return callBack(err); //returns with error
        });
    },

    getDB:()=> dbConnection
    
}