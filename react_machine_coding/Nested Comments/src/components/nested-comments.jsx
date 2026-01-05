import { useState } from "react";
import useCommentTree from "../hooks/use-comment-tree";
import "./styles.css";
import Comment from "./comment";

const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const {
    comments: commentsData,
    insertComment,
    updateComment,
    deleteComment,
  } = useCommentTree(comments);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(() => e.target.value);
  };

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
  };

  const handleUpdate = (commentId, content) => {
    updateComment(commentId, content);
    console.log(content);
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
  };

  const handleSubmit = (e) => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={handleChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        />
        <button className="comment-button" onClick={handleSubmit}>
          Add Comment
        </button>
      </div>

      {commentsData.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
          onSubmitComment={handleReply}
          onUpdateComment={handleUpdate}
          onDeleteComment={handleDelete}
        />
      ))}
    </>
  );
};

export default NestedComments;
