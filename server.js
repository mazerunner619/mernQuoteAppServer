const express = require('express');
const app = express();
const Route = require('./Routes/router');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const Quote = require('./Models/quoteModel');
const bodyParser = require('body-parser');

require('dotenv/config');


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', ( req, res) => {
    res.send("on the quote serverside home page");
});

app.get('/quotes', async function(req, res) {

    try{
        const quotes = await Quote.find();
        res.send(quotes);
        console.log('fetching successfull  ....');

    }catch(err){
        console.log('fetching unsuccessfull  ....');
 }
});

app.use('/', Route);
  
//process.env.MONGODB_URI
mongoose.connect(process.env.CONN_STRING, 
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }, 
    function(error){
        if(error){ 
            console.log(error);
        }
        else{
            console.log("connected to DB quoteBlogs");
        }
    }
 );


//step 3
//  if(process.env.NODE_ENV === "production"){
//     app.use(express.static('client/build'));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname,'client', 'build', 'index.html')); //relative path
//     });
//  }
 //step 1
  const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
    console.log(`Server is running on port:5000`);
});