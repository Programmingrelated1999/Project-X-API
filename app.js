//MODULES
//express app setup
const express = require("express");
//import mongoose
const mongoose = require("mongoose");

// connnect to mongodb
mongoose.connect("mongodb+srv://admin:ProjectXAdmin123@project-x.wkgu1a4.mongodb.net/?retryWrites=true&w=majority&appName=Project-X", { useNewUrlParser: true, useUnifiedTopology: true });

// import flashcard model
const Flashcard = require("./model/flashcard");

const app = express();

app.use(express.static('resources'));

//cross-origin resource sharing import
const cors = require("cors");

//utils
const config = require("./utils/config");
const logger = require("./utils/logger");

//cross origin
app.use(cors());

//transform all incoming request body into javascript object
app.use(express.json());

const data = [
    {id: 1, name: "Kevin", email: "test1@email.com"}, 
    {id: 2, name: "John", email: "test2@email.com"},
]

app.get('/user', (req, res) => {
    res.json(data);
  });

// get specific user by id
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = data.find(user => user.id == id);
    res.json(user);
  });

app.post('/user', (req, res) => {
    const body = req.body;
    console.log(body);
    res.json(body);
  });

// write a put method where i can edit the user name 
app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    // find the user with the id
    const user = data.find(user => user.id == id);
    // update the user name
    user.name = body.name;
    res.json(body);
});

app.get('/flashcards', (req, res) => {
    // get all flashcards
    Flashcard.find({}).then(flashcards => {
        res.json(flashcards);
    });
});

app.get('/flashcards/:id', (req, res) => {
    const id = req.params.id;
    // get flashcard by id
    Flashcard.findById(id).then(flashcard => {
        res.json(flashcard);
    });
});

//exports
module.exports = app;