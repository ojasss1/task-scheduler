const express = require('express');
const app = express();
const {MongoClient, ObjectId} = require('mongodb');
const  bp = require('body-parser');
const  cors = require('cors');
const firstmodel = require('./model');

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

const getdb = async (client) => {
    const data = await client.db().admin().listDatabases();
    data.databases.forEach(db => {
        console.log(db.name);
    })
}


const createdoc = async(client, data, coll) => {
    const result = await client.db("test").collection(coll).insertOne(data);

    console.log(result.insertedId);
}


const retrvdoc = async(client, uuid) => {
    const result = await client.db("test").collection(uuid).find();

    const results = await result.toArray();

    return results;
}










var client = "";


const mainfn = async () => {
    const url = "mongodb+srv://ojassharma2547:IX8o0S1YcyDieUXF@cluster0.tbgvfmi.mongodb.net/?retryWrites=true&w=majority";
    client = new MongoClient(url);

    try{
        await client.connect();
        
        // await retrvdoc(client);
    } catch(e){
        console.error(e);
    }
}

mainfn().catch(console.error);


app.get("/", (rq, rs) => {
    rs.send("On");
});


app.post("/add", async(rq, rs) => {
    try{
        createdoc(client, rq.body, rq.body.uuid);
        rs.send("inserted");
    }
    catch(e){
        console.error(e);
        rs.send(e);
    }
});


app.post("/getall", async(rq, rs) => {
    try{
        const results = await retrvdoc(client, rq.body.uuid);
        rs.send(results);
    }
    catch(e){
        console.error(e);
        rs.send(e);
    }
});

app.post("/complete", async (rq, rs) => {
    try{
        const obj = new ObjectId("65b1adc0fc5d15d07cd8e1c0");
        const res = await client.db("test").collection('rBE0px3FFeNZfRYUwKik1903ovh1').updateOne({
            "_id" : obj,},
            {
                $completed : true,
            }
        );

        console.log(done);
    }
    catch(e){
        rs.send(e);
        console.log(e);
    }
})

app.post("/deltask", async(rq, rs) => {
    try{
        const obj = new ObjectId(rq.body.id);
        await client.db("test").collection(rq.body.uuid).deleteOne({
            "_id" : obj,
        });
        console.log(rq.body);

        rs.send("done");
    }
    catch(e){
        console.log(e);
        rs.send(e);
    }
});

app.listen(5000, () => {
    console.log("running");
});


// IX8o0S1YcyDieUXF