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
const details = {
    "uid" : "NIL",
    "name" : "NIL",
    "age" : "NIL",
    "email" : "NIL",
    "Occupation" : "NIL",
    "Married": "NIL",
    "Bio" : "NIL",
    "Full_Name" : "NIL",
    "Linkedin" : "NIL",
    "Github" : "NIL",
    "Instagram" : "NIL",
    "username" : "NIL",
    "profile_pic" : "",
  };

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
        const coll = rq.body.uuid;
        const id = new ObjectId(rq.body.id);

        const complt = await client.db("test").collection(coll).findOne({
            _id : id,
        });

        await client.db("test").collection(coll).updateOne({
            _id : id,
        },{
            $set : {
                completed : !complt.completed,
            }
        });


        rs.send("dd");
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
      .then(async (userRecord) => {
        uuu = userRecord.uid;
        console.log('Successfully created new user:', userRecord.uid);
        client.db("test").createCollection(uuu);
        res.send(
            {msg : "registered",
            uuid : uuu,
        }
        );

        await client.db("profiles").createCollection(uuu)
        await client.db("profiles").collection(uuu).insertOne(
            {
                uid : uuu,
                name : "NIL",
                age : "NIL",
                email : email,
                Occupation : "NIL",
                Married: "No",
                Bio : "NIL",
                Full_Name : "NIL",
                Linkedin : "NIL",
                Github : "NIL",
                Instagram : "NIL",
                username : userid,
                profile_pic : ""
              }
        )
      })
      .catch((error) => {
        console.log(error);
        if (error.code == "auth/email-already-exists"){
          res.send({
            msg : "User exists, Please try again",
            uuid : "",
          });
        }
        else{
            res.send({
                msg : error.message + " Please try again",
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


app.get("/getprofile/:uid", async(rq, rs) => {
    try{
        const uuid = rq.params.uid;
        const profile_data = await client.db("profiles").collection(uuid).findOne();

        rs.send({
            msg : profile_data
        });
    } 
    catch(e){
        console.log(e);
        rs.send({
            msg : "Error"
        })
    }
});

app.get("/testing", async(rq, rs) => {
    try{
        var all_users = [];
        const result =  await client.db("test").listCollections();
        const results = await result.toArray()
        results.forEach(async (cl) => {
            var pp = await client.db("test").collection(cl.name).findOne()
            await client.db("profiles").collection(cl.name).updateOne({
                Bio : "NIL",
            }, {
                $set : {
                    profile_pic : "",
                },
            },{
                upsert : true
            })
        });
        // await client.db("profiles").createCollection(profile_data.uid)
        // await client.db("profiles").collection(profile_data.uid).insertOne(profile_data);

        rs.send("Done");
    }
    catch(e){
        console.log(e); rs.send(e);
    }
});

app.post("/update_profile", async(rq, rs) => {
    try{
        const data = rq.body;
        delete data._id;
        await client.db("profiles").collection(rq.body.uid).updateOne({}, {
            $set : {
                ...data
            }
        });
        
        rs.send({
            msg : "Success",
        })
    }
    catch(e){
        console.log(e);
        rs.send({
            msg : e
        })
    }
})

app.get('*', (req, res) => {
    res.redirect("/");
});

app.get("/", (rq, rs) => {
    rs.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(5000, () => {
    console.log("running");
});

// IX8o0S1YcyDieUXF