const express = require('express')
const cors = require('cors')
const User = require('./Models/users')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const PORT = 5000

const app = express()
app.use(cors())
app.use(bodyParser.json())
const db = "mongodb+srv://ram:123@cluster0.ckfs2.mongodb.net/contacts?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if (err) {
        console.log("error", err)
    }
    else {
        console.log('connected to server');
    }
})


app.get('/', function (req, res) {
    res.send("hello im server")
});


app.post('/sign-up', function (req, res)  {
    console.log("reached signup");
    let userData = req.body;
    User.findOne({ userName: userData.userName }, (error, user) => {
        if (user) {
         res.status(200).send("user alredy exists, please login or create a new account");
        }
        if (error) {
            console.log("error", error)
        }
        if(user==null)
        {console.log("no user esists");
            let user = new User(userData);
          user.save((err, registeredUser) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey');
            console.log("else statement")
            res.status(200).send({ "user": user, "token": token });
        }
    });
        }
    });
    
    
});

app.post('/sign-in', (req, res) => {
    let userData = req.body;
    User.findOne({ userName: userData.userName }, (error, user) => {
        console.log("finding one")
        if (error) {
            console.log(error, "this is the error")
        }
        else {
            if (!user) {
                res.status(401).send("Invalid userName")
            }
            else {
                if (user.password !== userData.password) {
                    res.status(401).send("Invalid Password")
                }
                else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.send({ "user": user, "token": token });
                }
            }
        }
    })
})

app.post('/contacts', verifyToken, function (req, res) {
    console.info("Request for get contacts");
    let userData = req.body;
    
    User.findOne({ _id: userData._id }, function (err, user) {
        if (err) {
            res.send("user", error);
        }
        else {
            
            if (user) {
                res.send(user.contacts);
            }
            else {
                res.send("no user found", user.contacts);
            }
        }
    });

});

app.post('/add-contact', verifyToken, function (req, res) {
    console.info("Request for add contact");
    let userData = req.body;
    User.findOne({ _id: userData._id }, function (err, user) {
        if (err) {
            res.send("user", error);
        }
        else if (user) {
            user.contacts.push(userData.contact);
            user.save();
            res.send(user.contacts);
        }
        else {
            res.send("no user found", user.contacts);
        }
    });
}

)

app.post('/remove-contact',verifyToken,function(req, res){
    let userData = req.body;
    User.findOne({ _id: userData.userid }, function (err, user) {
        if (err) {
            res.send("user", error);
        }
        else if (user) {
            user.contacts.remove({"_id":userData.contactid});
            user.save();
            res.send(user.contacts);
        }
        else {
            res.send("no user found", user.contacts);
        }
    });
})

app.listen(PORT, function () {
    console.log("server is running" + PORT);
})

function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request req lo authorization header ledhu')
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }

    let payload;
    jwt.verify(token, 'secretKey', (error, decoded) => {
        if (error) {
            console.log("this is the error comes always", error)
        }
        payload = decoded

    })


    console.log("normal payload", payload)

    if (payload) {
        req.userId = payload.subject
        next()
    }
    else {
        return res.status(401).send('Unauthorized request')
    }

}