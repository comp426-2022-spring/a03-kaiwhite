// Require Express.js
import { coinFlip, countFlips, coinFlips, flipACoin } from './coinFlips'
const express = require('express')
const app = express()
var arg = require('minimist')(process.argv.slice(2))

const port = arg.port || process.env.PORT || 5000
// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

//single flip
app.get('/app/flip', (req, res) => {
    res.status(200).json({"flip" : coinFlip()})
})

//many flip
app.get('/app/flips/:number', (req, res) => {
	const flips = countFlips(req.params.number);
	res.status(200).json(flips);
})

//guess flip
app.get('/app/flip/call/:guess', (req, res) => {
    res.status(200).json(flipACoin(req.params.guess))
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
