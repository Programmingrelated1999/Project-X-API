//MODULES
//express app setup
const express = require("express");
const app = express();

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

//exports
module.exports = app;