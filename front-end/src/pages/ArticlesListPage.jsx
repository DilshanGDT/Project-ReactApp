import ArticlesList from "../../../ArticlesList";
import articles from "../article-content";

export default function ArticlesListPage() {
    return (
        <>
        <ArticlesList articles={articles} />
        </>
    );
}