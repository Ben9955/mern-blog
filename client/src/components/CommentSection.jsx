import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`/api/comment/getPostComments/${postId}`);
      const data = await res.json();
      if (res.ok) setComments(data);
    };

    getComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (comment.length === 0)
        throw new Error("You must enter the comment before submitting");

      setCommentError(null);
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments((prev) => [data, ...prev]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  //

  // handle like

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();

        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  edit comment

  const editComment = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5  text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-6 w-6 object-cover rounded-full"
            src={currentUser.profilePicture}
          />{" "}
          <Link
            className="text-xs text-cyan-500 hover:underline"
            to="/dashboard?tab=profile"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to="/signin">
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button gradientDuoTone="purpleToBlue" outline type="submit">
              Submit
            </Button>
          </div>

          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 px-2 rounded-sm ">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleLike={handleLike}
              onEdit={editComment}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
