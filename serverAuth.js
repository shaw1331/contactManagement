require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())
const PORT = 4000;
console.log(PORT);



app.post('/login', (req,res) => {

    const username = req.body.username
    const user = {name : username}

    const accessToken = generateAccessToken(user) 
    res.json({ accessToken: accessToken  })
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); 
}



app.listen(PORT);
