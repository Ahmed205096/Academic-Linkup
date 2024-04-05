import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faThumbsUp,
  faMessage,
  faShareSquare,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MakeComment from "./MakeComment";
import {
  AddComment,
  DeletePost,
  deleteReaction,
  getReactionForSpecificPost,
  getReactionForSpecificUser,
  getReactions,
  setReactions,
} from "../../APIs/PostAPIs/APIs";
import { useSelector } from "react-redux";
import { getId } from "../../../Redux-TK/Slices/UserId";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../../Redux-TK/Slices/CurrentUserInfo";

export default function MakePost(props) {
  const state = useSelector(getId);
  const userID = state.payload.userId;

  // Get the current user information like name , id , image
  const userInfo = useSelector(getUserInfo).payload.userInfo;

  const [commentsDisplayed, setCommentsDisplayed] = useState("none");
  const [likeColor, setLikeColor] = useState("black");

  const [deletePost, setDeletePost] = useState("flext");

  // Make The Comment
  const [makeComment, setMakeComment] = useState([]);
  // The Value That Writes Inside The Textarea Of The Comment
  const [commentContent, setCommentContent] = useState("");
  // For Reactions (😍💖👏👍😂😡) State
  const [reactionState, setReactionState] = useState("none");
  // For Reactions (😍💖👏👍😂😡) Setting
  const [reaction, setReaction] = useState("");
  // For Reactions (😍💖👏👍😂😡) Color
  const [reactionColor, setReactionColor] = useState("black");
  // Reaction Number For Each Post
  const [reactionNumbersForPost, setReactionNumbersForPost] = useState(0);
  // User Reaction On Each Post
  const [reactionEachPost, setReactionEachPost] = useState([]);
  // Each Post Reactions On It
  const [postsReactions, setPostsReactions] = useState([]);

  // Get the post ID parts only if props.post_id is a string
  const postIdParts =
    typeof props.post_id === "string" ? props.post_id.split("/") : [];

  // Use the parts if they exist
  const postIdFirstPart = postIdParts.length > 0 ? postIdParts[0] : "x";
  const postIdSecondPart = postIdParts.length > 1 ? postIdParts[1] : "x";

  useEffect(() => {
    try {
      async function getPostsReactiosn() {
        const res = await getReactionForSpecificPost(
          postIdFirstPart,
          postIdSecondPart
        );

        setPostsReactions([...new Set(res)]);
      }
      getPostsReactiosn();
    } catch (e) {
      console.log(e);
    }
  }, [props.post_id]);

  // Get The Reaction Number For Each Post
  useEffect(() => {
    try {
      async function getAllReactions() {
        const res = await getReactions(postIdFirstPart, postIdSecondPart);
        setReactionNumbersForPost(res);
      }
      getAllReactions();
    } catch (e) {
      console.log(e);
    }
  }, [props.post_id]);

  useEffect(() => {
    try {
      async function displayReactions() {
        const reaction = await getReactionForSpecificUser(
          postIdFirstPart,
          postIdSecondPart,
          userID
        );
        setReactionEachPost(reaction);
      }
      displayReactions();
    } catch (e) {
      console.log(e);
    }
  }, [props.post_id, userID]);

  // The Function That Makes The Comment
  const makeCommentFunction = () => {
    const newComment = {
      user_name: userInfo.name,
      time: new Date().toLocaleString(),
      comment: commentContent,
      user_img: userInfo.img,
      user_id: userID,
    };

    setMakeComment([...makeComment, newComment]);
    setCommentContent("");
    AddComment(
      userID,
      props.post_id,
      commentContent,
      userInfo.name,
      userInfo.img
    );
  };

  // ----------------------------------------------------------------
  // The Intire Comments Component
  let CommetnsList = [];

  if (props.all_comments !== undefined) {
    CommetnsList = [...props.all_comments, ...makeComment].map(
      (comment, index) => {
        return (
          <MakeComment
            key={index}
            post_id={props.post_id}
            name={comment.user_name}
            time={comment.time}
            comment={comment.comment}
            comment_id={comment.id}
            user_img={comment.user_img}
            user_id_of_comment={comment.user_id}
            current_user_id={userID}
          />
        );
      }
    );
  }

  return (
    <>
      {/* Start Post */}
      <div
        style={{ display: deletePost }}
        className="mide-section-posts-container"
      >
        <div className="mide-section-posts-container-post">
          <div className="midel-section-posts-container-post-heading">
            <span>
              {/* User Image */}
              <div className="mide-section-posts-container-post-user-img">
                <Link to={`/profile/${props.user_id}`}>
                  <img src={props.user_img} alt="" />
                </Link>
              </div>
              {/* User Infos */}
              <div className="mide-section-posts-container-post-user-info">
                {/* User Name */}

                <div className="mide-section--posts-container-post-user-name">
                  <Link
                    style={{ color: "black" }}
                    to={`/profile/${props.user_id}`}
                  >
                    &#160;{props.name}
                  </Link>
                </div>

                {/* User Title */}
                <div
                  style={{ paddingLeft: "5px" }}
                  className="mide-section--posts-container-post-user-title"
                >
                  {props.user_title}
                </div>
                {/* Hours */}
                <div className="mide-section--posts-container-post-time">
                  &#160;{props.time}
                </div>
              </div>
            </span>
            {/* Trash */}

            {parseInt(userID) === parseInt(props.user_id) - 1772002 ? (
              <FontAwesomeIcon
                onClick={() => {
                  Swal.fire({
                    title: "Do you want to complete the deletion process?",
                    showClass: {
                      popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
                    },
                    hideClass: {
                      popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `,
                    },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      DeletePost(userID, `${props.post_id}`);
                      setDeletePost("none");
                    }
                  });
                }}
                style={{ cursor: "pointer" }}
                icon={faTrash}
              />
            ) : null}
          </div>
          {/* Post Body */}
          <div className="mide-section-posts-container-post-text-body">
            {props.post_content}
          </div>
          {/* Post Image */}
          <div className="mide-section-posts-container-post-img-body">
            <img src={props.post_img} alt="" />
          </div>
          {/* Reaction Icons */}
          <div className="mide-section-posts-container-post-reactions">
            <span>
              {reactionNumbersForPost.length}
              {postsReactions.toString().replaceAll(",", "")}
            </span>
            <span>
              {props.all_comments.length > 1
                ? props.all_comments.length + " comments"
                : props.all_comments.length + " comment"}{" "}
              0 share
            </span>
          </div>
          {/* Reactions Buttons */}
          <div className="mide-section-posts-container-post-btns">
            <button
              id="like-button"
              onClick={() => {
                likeColor === "black"
                  ? setLikeColor("blue")
                  : setLikeColor("black");
              }}
              style={{ color: likeColor }}
              className="mide-section-like-btn"
            >
              <div
                style={{ display: reactionState }}
                onMouseOver={() => {
                  setReactionState("block");
                }}
                onMouseLeave={() => {
                  setReactionState("none");
                }}
                className="mid-section-reactions"
              >
                <button
                  onClick={async () => {
                    try {
                      setReaction("😍");

                      if (reactionColor === "#ff69b4") {
                        setReactionColor("black");
                        await deleteReaction(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          userID
                        );
                      } else {
                        setReactionColor("#ff69b4");
                        await setReactions(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          {
                            user_id: userID,
                            user_img: userInfo.img,
                            user_name: userInfo.name,
                            reaction: "😍",
                          }
                        );
                      }

                      // Update reaction numbers and color after updating reactions
                      const res = await getReactions(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1]
                      );
                      setReactionNumbersForPost(res);
                      const reaction = await getReactionForSpecificUser(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1],
                        userID
                      );
                      setReactionEachPost(reaction);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  😍
                </button>

                <button
                  onClick={async () => {
                    try {
                      setReaction("💖");

                      if (reactionColor === "#ff66c4") {
                        setReactionColor("black");
                        await deleteReaction(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          userID
                        );
                      } else {
                        setReactionColor("#ff66c4");
                        await setReactions(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          {
                            user_id: userID,
                            user_img: userInfo.img,
                            user_name: userInfo.name,
                            reaction: "💖",
                          }
                        );
                      }

                      // Update reaction numbers and color after updating reactions
                      const res = await getReactions(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1]
                      );
                      setReactionNumbersForPost(res);
                      const reaction = await getReactionForSpecificUser(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1],
                        userID
                      );
                      setReactionEachPost(reaction);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  💖
                </button>

                <button
                  onClick={async () => {
                    try {
                      setReaction("👏");

                      if (reactionColor === "#ffd700") {
                        setReactionColor("black");
                        await deleteReaction(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          userID
                        );
                      } else {
                        setReactionColor("#ffd700");
                        await setReactions(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          {
                            user_id: userID,
                            user_img: userInfo.img,
                            user_name: userInfo.name,
                            reaction: "👏",
                          }
                        );
                      }

                      // Update reaction numbers and color after updating reactions
                      const res = await getReactions(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1]
                      );
                      setReactionNumbersForPost(res);
                      const reaction = await getReactionForSpecificUser(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1],
                        userID
                      );
                      setReactionEachPost(reaction);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  👏
                </button>

                <button
                  onClick={async () => {
                    try {
                      setReaction("👍");

                      if (reactionColor === "#ffcc03") {
                        setReactionColor("black");
                        await deleteReaction(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          userID
                        );
                      } else {
                        setReactionColor("#ffcc03");
                        await setReactions(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          {
                            user_id: userID,
                            user_img: userInfo.img,
                            user_name: userInfo.name,
                            reaction: "👍",
                          }
                        );
                      }

                      // Update reaction numbers and color after updating reactions
                      const res = await getReactions(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1]
                      );
                      setReactionNumbersForPost(res);
                      const reaction = await getReactionForSpecificUser(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1],
                        userID
                      );
                      setReactionEachPost(reaction);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  👍
                </button>

                <button
                  onClick={async () => {
                    try {
                      setReaction("😂");

                      if (reactionColor === "#ffcc00") {
                        setReactionColor("black");
                        await deleteReaction(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          userID
                        );
                      } else {
                        setReactionColor("#ffcc00");
                        await setReactions(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          {
                            user_id: userID,
                            user_img: userInfo.img,
                            user_name: userInfo.name,
                            reaction: "😂",
                          }
                        );
                      }

                      // Update reaction numbers and color after updating reactions
                      try {
                        const res = await getReactions(
                          +props.post_id.split("/")[0],
                          +props.post_id.split("/")[1]
                        );

                        setReactionNumbersForPost(res);
                        const reaction = await getReactionForSpecificUser(
                          +props.post_id.split("/")[0],
                          +props.post_id.split("/")[1],
                          userID
                        );
                        setReactionEachPost(reaction);
                      } catch (e) {
                        console.log(e);
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  😂
                </button>

                <button
                  onClick={async () => {
                    try {
                      setReaction("😡");

                      if (reactionColor === "#ff0000") {
                        setReactionColor("black");
                        await deleteReaction(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          userID
                        );
                      } else {
                        setReactionColor("#ff0000");
                        await setReactions(
                          props.post_id.split("/")[0],
                          props.post_id.split("/")[1],
                          {
                            user_id: userID,
                            user_img: userInfo.img,
                            user_name: userInfo.name,
                            reaction: "😡",
                          }
                        );
                      }

                      // Update reaction numbers and color after updating reactions
                      const res = await getReactions(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1]
                      );
                      setReactionNumbersForPost(res);
                      const reaction = await getReactionForSpecificUser(
                        +props.post_id.split("/")[0],
                        +props.post_id.split("/")[1],
                        userID
                      );
                      setReactionEachPost(reaction);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  😡
                </button>
              </div>
              <div
                style={{ color: reactionColor }}
                onMouseEnter={() => {
                  setReactionState("block");
                }}
                onMouseLeave={() => {
                  setReactionState("none");
                }}
              >
                {reaction !== ""
                  ? reaction === "👍"
                    ? "👍 Like"
                    : reaction === "👏"
                    ? "👏 claping"
                    : reaction === "😂"
                    ? "😂 laughing"
                    : reaction === "😡"
                    ? "😡 anger"
                    : reaction === "😍"
                    ? "😍 heart eyes"
                    : reaction === "💖"
                    ? "💖 heart"
                    : null
                  : reactionEachPost
                  ? reactionEachPost
                  : `👍 Like`}
              </div>
            </button>

            <button
              onClick={() => {
                commentsDisplayed === "none"
                  ? setCommentsDisplayed("block")
                  : setCommentsDisplayed("none");
              }}
              className="mide-section-comment-btn"
            >
              <FontAwesomeIcon icon={faMessage} /> Comments
            </button>

            <button className="mide-section-comment-btn">
              <FontAwesomeIcon icon={faShareSquare} /> Share
            </button>
          </div>
        </div>
        {/* Make Comment */}
        <div className="mide-section-posts-container-create-comment">
          <textarea
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
            value={commentContent}
            placeholder="Enter your comment ..."
          ></textarea>
          <button
            onClick={() => {
              makeCommentFunction();
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        <div
          style={{ display: commentsDisplayed }}
          className="comment-section-outer-container"
        >
          <div className="all-comments-container">{CommetnsList.reverse()}</div>
        </div>
      </div>
      {/*  */}
    </>
  );
}
