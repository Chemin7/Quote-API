const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random',(req,res)=>{
    let randQuote = getRandomElement(quotes).quote;
    res.send(randQuote);
})

app.get('/api/quotes',(req,res)=>{
    let name = req.query.person;
    if(name){
        let result = [];
        for(let element of quotes){
            if(element.person == name){
                result.push(element.quote)
            }
        }
        
        
        res.send({quotes:result})

    }else{
        let result = []

        for(let element of quotes){
            result.push(element.quote);
        }
        res.send({quotes:result});
    }
})
app.listen(PORT)
