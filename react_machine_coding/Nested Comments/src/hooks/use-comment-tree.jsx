import { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments || []);

  function insertNode(tree, commentId, content) {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }

      return comment;
    });
  }

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prevComments) => insertNode(prevComments, commentId, newComment));
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  function updateNode(tree, commentId, content) {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
          edited: true,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateNode(comment.replies, commentId, content),
        };
      }

      return comment;
    });
  }

  function updateComment(commentId, content) {
    setComments((prevComments) => updateNode(prevComments, commentId, content));
  }

  function deleteNode(tree, commentId) {
    let didChange = false;

    const updatedTree = tree
      .map((comment) => {
        // Case 1: delete this node
        if (comment.id === commentId) {
          didChange = true;
          return null;
        }

        // Case 2: try deleting from replies
        if (comment.replies.length > 0) {
          const updatedReplies = deleteNode(comment.replies, commentId);

          // Only recreate object if replies changed
          if (updatedReplies !== comment.replies) {
            didChange = true;
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
        }

        // Case 3: untouched node
        return comment;
      })
      // Remove deleted nodes
      .filter(Boolean);

    // 🔑 Structural sharing: return same reference if nothing changed
    return didChange ? updatedTree : tree;
  }

  function deleteComment(commentId) {
    console.log("true");

    setComments((prevComments) => deleteNode(prevComments, commentId));
  }

  return {
    comments,
    insertComment,
    updateComment,
    deleteComment,
  };
};

export default useCommentTree;
