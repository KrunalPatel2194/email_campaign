const express = require('express');
const app = express();

app.get('/', (req,res) =>{
    res.send({hi:'changed'});
})

//Heroku can inject env port
const PORT = process.env.PORT || 5000;
app.listen(PORT);