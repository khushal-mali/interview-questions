import { useState } from "react";

const Comment = ({
  comment = {},
  onSubmitComment = () => {},
  onUpdateComment = () => {},
  onDeleteComment = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleChange = (e) => {
    setReplyContent(() => e.target.value);
  };

  const handleReplySubmit = () => {
    onSubmitComment(comment.id, replyContent);
    setReplyContent("");
  };

  function toggleExpand() {
    setExpand((ex) => !ex);
  }

  function handleSaveEditedContent() {
    onUpdateComment(comment.id, editedContent);
    setIsEditing(false);
    // setEditedContent("");
  }

  function handleDelete() {
    onDeleteComment(comment.id);
  }

  return (
    <div className="comment">
      <>
        {isEditing ? (
          <textarea
            className="comment-content"
            rows={2}
            cols={40}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="comment-content">{comment.content}</p>
        )}

        <p className="comment-info">Votes: {comment.votes}</p>
        <p className="comment-info">{new Date(comment.timestamp).toLocaleString()}</p>
      </>

      <div className="comment-actions">
        {!isEditing ? (
          <>
            <button className="comment-button" onClick={toggleExpand}>
              {expand ? "Hide Replies" : "Reply"}
            </button>
            <button
              className="comment-button"
              onClick={() => {
                setEditedContent(comment.content);
                setIsEditing(true);
              }}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <button className="comment-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="comment-button" onClick={handleSaveEditedContent}>
              Save
            </button>
          </>
        )}

        <button className="comment-button" onClick={handleDelete}>
          Delete
        </button>

        {comment.edited && <div className="edited">edited</div>}
      </div>

      {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              value={replyContent}
              onChange={handleChange}
              rows={3}
              cols={50}
              className="comment-textarea"
              placeholder="Add a new reply..."
            />
            <button className="comment-button" onClick={handleReplySubmit}>
              Add Reply
            </button>
          </div>

          {comment?.replies.map((reply) => {
            return (
              <Comment comment={reply} key={reply.id} onSubmitComment={onSubmitComment} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
