const express = require('express');
const router = express.Router();

const Quote = require('../Models/quoteModel');

router.post('/post' , (req, res) => {
    const newQuote = new Quote(
        {
            author : req.body.author,
            quote : req.body.quote,
        });
    newQuote.save();
    res.send(newQuote);
});

router.get('/disp' , async (req, res) => {
    try{
        const quotes = await Quote.find();
        res.send(quotes);
    }catch(err){
        res.send(err);
    }
});

router.get('/delete', async (req, res) => {
    try{
       const rem = await Quote.remove({});
       res.send(rem);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;