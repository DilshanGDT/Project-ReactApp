import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

app.use(express.json());    //to enable request body parsing

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    //database connection URI
    const uri = 'mongodb://localhost:27017';

    //creating a new MongoClient
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    //connecting to the database instance
    await client.connect();

    //accessing the database
    const db = client.db('full-stack-react-db');

    //create query 
    const articles = await db.collection('articles').findOne({ name });

    res.json(articles);
});

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