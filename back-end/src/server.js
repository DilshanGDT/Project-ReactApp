import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

app.use(express.json());    //to enable request body parsing

let db;

async function connectToDb() {
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
    db = client.db('full-stack-react-db');
}

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    //create query 
    const articles = await db.collection('articles').findOne({ name });

    res.json(articles);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    
    const updatedArticle =  await db.collection('articles').findOneAndUpdate({ name }, {
        $inc: { upvotes: 1 },
    }, {    
        returnDocument: 'after',
    });

    res.json(updatedArticle);
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $push: { comments: newComment },
    }, {
        returnDocument: 'after',
    });
    res.json(updatedArticle);
});

async function start() {
    await connectToDb();

    app.listen(8000, function() {
        console.log("Server is listening on port 8000");
    });
}

start();