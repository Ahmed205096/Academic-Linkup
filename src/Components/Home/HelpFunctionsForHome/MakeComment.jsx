import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  DeleteComment,
  getAllCommentsByUserIdAndPostId,
} from "../../APIs/PostAPIs/APIs";
import { useEffect, useState } from "react";

export default function MakeComment(props) {
  const [comments, setComments] = useState(props.comment);
  const [deleteComment, setDeletePostComment] = useState("flext");
  const [deleteCommentAnimation, setDeletePostCommentAnimation] = useState("");



  useEffect(() => {
    try {
      async function getTheComments() {
        const res = await getAllCommentsByUserIdAndPostId(
          props.post_id.split("/")[0],
          props.post_id.split("/")[0]
        );
        return res;
      }

      getTheComments().then((result) =>
        setComments((prev) => [...prev, result.comment])
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: deleteComment,
          animationName: deleteCommentAnimation,
        }}
        className="comments-section-container"
      >
        <div className="comment">
          <span>
            <div className="comment-user-img">
              <img src={props.user_img} alt="" />
            </div>
            <div className="comment-user-info">
              <div className="comment-user-name">&#160;{props.name}</div>
              <div className="comment-time">&#160;{props.time}</div>
            </div>
          </span>

          {+props.user_id_of_comment === props.current_user_id ? (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faTrash}
              onClick={() => {
                if (props.comment_id !== undefined) {
                  setDeletePostCommentAnimation("DistroyComment");
                  setTimeout(() => {
                    setDeletePostComment("none");
                    console.log("Comment Id to delete", props.comment_id);
                    try {
                      DeleteComment(
                        props.post_id.split("/")[0],
                        props.post_id.split("/")[1],
                        props.comment_id
                      );
                    } catch (e) {
                      console.log(e);
                    }
                    console.log(props.comment_id);
                  }, 600);
                }
              }}
            />
          ) : null}
        </div>
        <div className="comment-body">{comments}</div>
      </div>
    </>
  );
}
