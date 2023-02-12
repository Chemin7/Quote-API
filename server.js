const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random',(req,res)=>{
    let randQuote = getRandomElement(quotes);
    res.send({quote:randQuote});
})

app.get('/api/quotes',(req,res)=>{
    let name = req.query.person;
    if(name){
        let result = quotes.filter(quote => quote.person === req.query.person)
        
        
        res.send({quotes:result})

    }else{
        
        res.send({quotes:quotes});
    }
})

app.post('/api/quotes',(req,res)=>{
    let newQuote = req.query.quote;
    let newPerson = req.query.person;
    let quoteObj = {
        quote:newQuote,
        person:newPerson
    }
    console.log(quoteObj)
    if(newPerson && newQuote){
        quotes.push(quoteObj);
        res.send({quote:quoteObj})
    }else{
        res.status(400).send();
    }
})
app.listen(PORT)
