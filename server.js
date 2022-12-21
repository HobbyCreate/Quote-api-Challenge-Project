const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Starting on port ${PORT}`);
})


// Get random quote Route
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
});

// Get All quotes if we do not input the author's value
// else get a quote from the author that we inputted in.
app.get('/api/quotes', (req, res, next) => {
    const filterQuotes = quotes.filter(quote => quote.person === req.query.person);
    if (req.query.person) {
        res.send({ quotes: filterQuotes });
    } else {
        res.send({ quotes: quotes });
    }
});

// Add new quote Route
app.post('/api/quotes', (req, res, next) => {
    console.log(req.query.quote);
    console.log(req.query.person);
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };
    if (newQuote.quote != '' && newQuote.person != '' ){
        quotes.push(newQuote);

        res.send({ quote: newQuote });
    } else {
        res.status(400).send();
    }
});
