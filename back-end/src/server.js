import express from 'express';

const app = express();

app.use(express.json());    //to enable request body parsing

app.get('/hello', function(req, res) {
    res.send('Hello');
})

app.post('/hello', function(req, res) {
    res.send('Hello ' + req.body.name + ' from the POST method');
})

app.listen(8000, function() {
    console.log("Server is listening on port 8000");
});