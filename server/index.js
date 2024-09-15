const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const RegisterModel = require('./models/Register')


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/employee');

app.get("/", (req, res) =>{
    res.json("Hello");
})

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json("Account created"))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})