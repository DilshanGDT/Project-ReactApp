    import { useParams, useLoaderData } from "react-router-dom";
    import articles from "../article-content";
    import axios from "axios";

    export default function ArticlePage() {
        const { name } = useParams();
        const { upvotes, comments } = useLoaderData(); //data from the loader function in the route

        const article = articles.find(a => a.name === name);

        return (
            <>
            <h1>{article.name}</h1>
            <p>This article has {upvotes} upvotes</p>
            {article.content.map(p => <p key={p}>{p}</p>)} //each paragraph displaying
            </>
        );
    }

    export async function loader({ params }) {
        const response = await axios.get('/api/articles/' + params.name); //we can use await because we defined the function as async
        const { upvotes, comments } = response.data;
        return { upvotes, comments };  //return the data to the page
    }