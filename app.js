const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 8000;

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});

var contact = mongoose.model('contact', contactSchema);// lock the schema and than do not cahnge

// express specific stuff
app.use('/static', express.static('static'));// for service static files
app.use(express.urlencoded())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname , '/'));

//endpoint
app.get('/',  (req, res)=>{
    const params = { }
    res.status(200).render('home.pug' , params)
});

app.get('/contact',  (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug' , params)
});

app.post('/contact',  (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved in database")
    }).catch(()=>{
        res.send(400).send("item was not saved to the database")
    });
    // res.status(200).render('contact.pug')
});


//start the server
app.listen(port, ()=>{
    console.log(`this is application start  successfuly on port ${port}`);
});
