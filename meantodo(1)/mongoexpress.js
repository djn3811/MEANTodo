const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');
const app = express();
const ObjectId = require('mongodb').ObjectID;
const _ = require('underscore')

const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0-afp5w.mongodb.net/test?retryWrites=true&w=majority';

//enter database name here
const DATABASE_NAME = "database";

const COLLECTION_NAME = "data";

const port = 3000;

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsCuccessStatus: 200
}

tickets = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/final', (req, res) => {
    //                                          These two parameters supress warnings
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
        if (error) throw error;

        database = client.db(DATABASE_NAME);
        //      once you have this object your off to the races
        collection = database.collection(COLLECTION_NAME);

        console.log("Connected to " + DATABASE_NAME);
        //      do your queries on the "collection" object
        collection.find({}).toArray((err, result) => {
            if (err) throw err;
            console.log(`Displaying everything from ${COLLECTION_NAME}`);

            if (result) {
                return res.status(200).send(result);
            }
            //client.close();
        })
    })
});


app.post('/addfood', (req, res) => {
    //                                          These two parameters supress warnings
    console.log('TRYING TO POST...')
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
        if (error) throw error;

        database = client.db(DATABASE_NAME);
        //      once you have this object your off to the races
        collection = database.collection(COLLECTION_NAME);

        console.log("Connected to " + DATABASE_NAME);
        collection.insertOne(req.body, (err, result) => {
            if (err) throw err;
        })
        console.log(req.body + ' posted')

        res.send({ message: 'success: ' })
    })
});


app.delete('/deletefood/:id', (req, res) => {
    console.log('Trying to delete...')
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
        if (error) throw error;

        database = client.db(DATABASE_NAME);
        //      once you have this object your off to the races
        collection = database.collection(COLLECTION_NAME);

        console.log("Connected to " + DATABASE_NAME);
        
        var idDelete = {_id : ObjectId(req.params.id)}
        collection.deleteOne(idDelete)
            .then(result => console.log(`Deleted ${result.deletedCount} item.`))
            .catch(err => console.error(`Delete failed with error: ${err}`))
        res.send({ message: 'success' })
    })
});




app.listen(port, () => {
    console.log('Server is up!');
});
