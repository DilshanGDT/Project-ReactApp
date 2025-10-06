import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';
import articles from '../article-content';

export default function ArticlePage() {
  const { name } = useParams();
  const data = useLoaderData() || {};
  const { upvotes: initialUpvotes = 0, comments: initialComments = [] } = data;
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const article = articles.find(a => a.name === name);

  async function onUpvoteClicked() {
    const response = await axios.post('/api/articles/' + name + '/upvote');
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  async function onAddComment({ nameText, commentText }) {
    const response = await axios.post('/api/articles/' + name + '/comments', {
      postedBy: nameText,
      text: commentText,
    });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  }

  return (
    <>
    <h1>{article.title}</h1>
    <button onClick={onUpvoteClicked}>Upvote</button>
    <p>This article has {upvotes} upvotes</p>
    {article.content.map(p => <p key={p}>{p}</p>)}
    <AddCommentForm onAddComment={onAddComment} />
    <CommentsList comments={comments} />
    </>
  );
}

export async function loader({ params }) {
  try {
    const response = await axios.get('/api/articles/' + params.name);
    const article = response.data;
    return {
      upvotes: article?.upvotes || 0,
      comments: article?.comments || []
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return { upvotes: 0, comments: [] };
  }
}