const express = require("express");
const bodyParser = require("body-parser");
const bcrpyt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const sqlDatabase = knex({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "smartbrainsAdmin",
        password: "123456",
        database: "smartbrains"
    }
});

console.log(sqlDatabase.select("*").from("users"));

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: "123",
            name: "john",
            email: "john@gmail.com",
            password: "cookie",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "sally",
            email: "sally@gmail.com",
            password: "banana",
            entries: 0,
            joined: new Date()
        }
    ]
}
app.get("/", (req, res) => {
    res.send(database.users);
});

app.post("/signin", (req, res) => {
    // console.log(req.body);
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password)
        res.json(database.users[0]);
    else 
        res.status(400).json("error loggin in");
});

app.post("/register", (req, res) => {

    sqlDatabase("users")
        .returning("*")
        .insert({
            email: req.body.email,
            name: req.body.name,
            joined: new Date()
        })
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json("Unable To Register"))

});

app.get("/profile/:id", (req, res) => {
    const id = req.params.id;
    let bFound = false;
    database.users.map(user => {
        if(user.id == id)
        {
            bFound = true;
            return res.json(user);
        }
    });

    if(!bFound)
        res.send("no such user");

});

app.put("/image", (req, res) => {
    const id = req.body.id;
    let bFound = false;
    database.users.map(user => {
        if(user.id == id)
        {
            bFound = true;
            user.entries++;
            return res.json(user.entries);
        }
            
    });

    if(!bFound) 
        res.send("no such user");
})

app.listen(4000, () => console.log("Server Up and Running At 127.0.0.1:3000"));