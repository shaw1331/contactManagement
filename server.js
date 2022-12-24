require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Contact = require('./model/contact.js');
app.use(express.json())
const PORT = 3000;
console.log(PORT);

mongoose.connect('mongodb://127.0.0.1:27017/contactdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("Connected to Database");})
.catch((err) => {console.log("Not Connected to Database", err);});
const posts = [
    {
        username: 'Saurabh',
        title: 'Post 1'
    },
    {
        username: 'Wubbs',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    const post = posts.find(post => post.username === req.user.name)
    
    if(post==null){    
        return res.send("Unauthorized")
    }

    res.json(posts.filter(post => post.username === req.user.name))
})
    

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


app.post('/db', authenticateToken, async(req,res) => {
    const post = posts.find(post => post.username === req.user.name)
    
    if(post==null){    
        return res.send("Unauthorized to make changes in DB")
    }
    
    try{
        const contact = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            linkedinURL: req.body.linkedinURL,
        })
        console.log("Successfully added new contact");
        res.send(contact)
    } catch(err){
        console.send("duplicate data")
    }

})
app.get('/db', authenticateToken, (req,res) => {
    const post = posts.find(post => post.username === req.user.name)
    
    if(post==null){    
        return res.send("Unauthorized to access DB")
    }
    
    Contact.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })

})



app.listen(PORT);
