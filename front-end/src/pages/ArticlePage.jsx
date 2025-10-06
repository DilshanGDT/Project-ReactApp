import { useParams, useLoaderData } from "react-router-dom";
import articles from "../article-content";

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