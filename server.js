import express from 'express';
const app = express();
import { createRequire } from "module";  const require = createRequire(import.meta.url);
const {MongoClient, ObjectId} = require('mongodb');
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const cron = require('node-cron');
const serviceAccount =  require('./key.json');
import admin from 'firebase-admin';
import bp from 'body-parser';
import cors from 'cors';
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'build')));

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
  };

admin.initializeApp(firebaseConfig);
const db2 = admin.firestore();

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






cron.schedule('*/7 * * * *', () => {
    fetch('https://task-scheduler-kt4g.onrender.com/keep-alive').then((res) => res.text()).then((data) => console.log(data)).catch((e) => console.log(e));
  });

  app.get('/keep-alive', (req, res) => {
    res.send('Server is alive');
  });



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

app.post('/register', async(req, res) => {
    try{
  
      const userid = req.body.username;
      const passwd = req.body.passwd;
      const email = req.body.email;
  
      // console.log(userid, passwd, email);
      var uuu;
      admin.auth()
      .createUser({
        email: email,
        emailVerified: false,
        password: passwd,
        displayName: userid,
      })
      .then((userRecord) => {
        uuu = userRecord.uid;
        console.log('Successfully created new user:', userRecord.uid);
        client.db("test").createCollection(uuu);
        res.send(
            {msg : "registered",
            uuid : uuu,
        }
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.code == "auth/email-already-exists"){
          res.send({
            msg : "User exists",
            uuid : "",
          });
        }
        else{
            res.send({
                msg : error.code + ", Please try again",
                uuid : "",
              });
        }
      });
  
      //const r = await db.collection("Users").doc(userid);
  
      // r.get().then(async (doc) => {
      //   if (!doc.exists){
      //     const data = {password : passwd,};
      //     await r.set(data);
      //     res.send("registered");
      //   }
      //   else{
      //     res.send("User exists");
      //   }
      // });
    }
    catch(err){
      console.log(err); res.send(err);
    }
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log("running");
});

// IX8o0S1YcyDieUXF