const express = require("express");

const { connectToDB, getDB } = require("./db");

const app = express();
app.use(express.json()); //pass any json coming from a request so we can use it in handler functions

let db;
let countriesCollection;

connectToDB((err) => {
    if (!err) {
        app.listen(3000, () => { console.log("Server Listening in port 3000") });
        db = getDB();
        countriesCollection = db.collection('countries');
    }
});

//routes

//get all countries
app.get(
    "/countries",
    (req, res) => {
        //TODO implement pagination
        const pageNum = req.query.page ?? 0; 
        const docsPerPage = 34;
        countries = [];
        countriesCollection
            .find()
            .skip(docsPerPage*pageNum)
            .limit(docsPerPage)
            .forEach(country => countries.push(country))
            .then(() => {
                res.status(200).json(countries)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ error: 'Query failed' });
            });
    });

//get by iso alpha 3 or alpha 2
app.get(
    "/countries/:alpha",
    (req, res)=>{
        const iso = req.params.alpha.toLowerCase();
        if(iso.length == 2){
            countriesCollection
            .findOne({alpha2:iso})
            .then((country)=>{res.status(200).json(country)})
            .catch((err)=>res.status(500).json({error: 'Could not find document'}));
            
        }
        else if(iso.length == 3){
            countriesCollection
            .findOne({alpha3:iso})
            .then((country)=>{res.status(200).json(country)})
            .catch((err)=>res.status(500).json({error: 'Could not find document'}));
            
        }else{
            res.status(500).json({error:'The official ISO 4217 standard specifies three-letter ("Alpha-3") codes for currencies worldwide'})
        }


    }

);


//developer endpoints

//update many

app.patch(
    '/countries/:alpha3',
    (req, res)=>{
        
    }
);




