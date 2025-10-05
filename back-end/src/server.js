import express from 'express';

const app = express();

app.use(express.json());    //to enable request body parsing

const articleInfo = [
  { name: 'learn-node', upvotes: 0, comments: [] },
  { name: 'learn-react', upvotes: 0, comments: [] },
  { name: 'mongodb', upvotes: 0, comments: [] },
]

app.get('/hello', function(req, res) {
    res.send('Hello');
})

app.get('/hello/:name', function(req, res) {
    res.send('Hello ' + req.params.name + ' from the GET method');
})

app.post('/hello', function(req, res) {
    res.send('Hello ' + req.body.name + ' from the POST method');
})

app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a => a.name === req.params.name);
    article.upvotes += 1;

    res.send('Successfully upvoted the article ' + req.params.name + '. It now has ' + article.upvotes + ' upvotes.');
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const article = articleInfo.find(a => a.name === name);

    article.comments.push({
        postedBy,
        text
    });

    res.json(article);
});

app.listen(8000, function() {
    console.log("Server is listening on port 8000");
});