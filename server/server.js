const express = require('express');
const { connectToDb, getDb } = require('./db');
const cors = require("cors");
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

// parse application/x-www-form-urlencoded


const PORT = 5000;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log(`Listening port ${PORT}`);
    });
    db = getDb();
  } else {
    console.log(`DB connection error: ${err}`);
  }
});

app.get('/organizers', (req, res) => {
    const events = [];
    db.collection('organizers').find().forEach(elem => events.push(elem)).then(() => {
        res.status(200).json(events)
    });
});
app.get('/events&sort=name', (req, res) => {
    const events = [];
    db.collection('events').find().sort({event:-1}).forEach(elem => events.push(elem)).then(() => {
        res.status(200).json(events)
    });
});
app.get('/events&sort=date', (req, res) => {
    const events = [];
    db.collection('events').find().sort({date:-1}).forEach(elem => events.push(elem)).then(() => {
        res.status(200).json(events)
    });
});
app.get('/events', (req, res) => {
    const events = [];
    db.collection('events').find().forEach(elem => events.push(elem)).then(() => {
        res.status(200).json(events)
    });
});
app.get('/juri', (req, res) => {
    const events = [];
    db.collection('juri').find().forEach(elem => events.push(elem)).then(() => {
        res.status(200).json(events)
    });  
});
app.get('/users', (req, res) => {
    const events = [];
    db.collection('users').find().forEach(elem => events.push(elem)).then(() => {
        res.status(200).json(events)
    });
});
app.post('/autorization',  async (req, res) => {
    let dbId = req.body._id;
    if (dbId == ''){ return res.status(400).json({
        success: false,
    })}
    let o_id = new ObjectId(dbId); 

    const collections = ['juri', 'users', 'moderators', 'organizers'];
    for(let i=0; i < collections.length; i++) {
        const user = await db.collection(collections[i]).findOne({password: req.body.password, _id: o_id});
        if(user) {
            return res.status(200).json({
                success: true,
                role: collections[i],
                data: user
            });
        }
        if(i == collections.length - 1) {
            return res.status(400).json({
                success: false,
            })
        }
    }
});

app.post('/organizers/edit',(req, res) => {
    console.log(req.body)
    let dbId = req.body._id;
    let o_id = new ObjectId(dbId);
    let result = Object.assign({}, req.body);
    delete result._id;
    db.collection('organizers').updateOne({_id: o_id}, {$set: {...result}});
    return res.status(200).json({
        success:true,
    }) 
})