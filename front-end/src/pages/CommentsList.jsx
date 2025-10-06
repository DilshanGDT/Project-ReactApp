export default function CommentsList({ comments = [] }) {
    if (!Array.isArray(comments)) {
        console.error('Comments prop is not an array:', comments);
        return null;
    }

    return (
        <>
        <h3>Comments : </h3>
        {comments.map((comment, idx) => {
            if (!comment || typeof comment !== 'object') {
                console.error('Invalid comment at index', idx, comment);
                return null;
            }
            return (
                <div key={idx}>
                    <h4>{comment.postedBy || 'Anonymous'}</h4>
                    <p>{comment.text || 'No comment text'}</p>
                </div>
            );
        })}
        </>
    );
}