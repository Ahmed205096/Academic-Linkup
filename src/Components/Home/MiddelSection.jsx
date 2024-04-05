import "./Styles/MidSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faVideo,
  faFilePdf,
  faCheckDouble,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import MakePost from "./HelpFunctionsForHome/MakePost";
import { useEffect, useState } from "react";
import {
  AddPost,
  GetAllPosts,
  GetFriendPosts,
  GetUserPosts,
} from "../APIs/PostAPIs/APIs";
import { useSelector } from "react-redux";
import { getId } from "../../Redux-TK/Slices/UserId";
import shuffleArray from "../HelperFunction/Shuffle";
import {
  ImageUpload,
  PdfUpload,
  VideoUpload,
} from "./HelpFunctionsForHome/ReadAssets";
import AlertDismissibleExample from "./HelpFunctionsForHome/Alert";

export default function MidSection(props) {
  const state = useSelector(getId);
  const userID = state.payload.userId;

  // Make The Post
  const [makePost, setMakePost] = useState([]);
  // The Value That Writes Inside The Textarea Of The Post
  const [postContent, setPostContent] = useState("");
  // Store Post Image
  const [image, setImage] = useState("");
  // Store Post Video
  const [video, setVide] = useState("");
  // Store Post File
  const [file, setFile] = useState("");
  // Filter
  const [filterPosts, setFilterPosts] = useState(false);

  // Display or hide the filter
  const [filterDisplay, setFilterDisplay] = useState("none");
  const [filterAnimation, setFilterAnimation] = useState(
    "FilterAnimationClose"
  );

  // Store All Posts From API
  const [getPosts, setPosts] = useState([]);
  const [getPostsForAllUsers, setPostsForAllUsers] = useState([]);
  const [getFriendsIDs, setFriendsIDs] = useState([]);

  // The Function That Makes The Post
  const makePostFunction = () => {
    if (
      postContent.trim() !== "" ||
      image !== "" ||
      video !== "" ||
      file !== ""
    ) {
      const newPost = {
        id: Date.now(), // Use a unique ID for the new post
        time: new Date().toLocaleString(),
        post_content: postContent,
        comments: [], // Initialize comments as an empty array
      };

      setMakePost([...makePost, newPost]);
      setPostContent("");
      setImage("");
      setVide("");
      setFile("");
      AddPost(userID, postContent);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  // Get Posts For The Current User From API
  // Get All Posts For All Users From API

  useEffect(() => {
    async function getUserPosts() {
      if (userID !== 0) {
        const AllPosts = await GetUserPosts(userID);
        setPosts(AllPosts);

        const AllPosts2 = await GetAllPosts(userID);
        setPostsForAllUsers(AllPosts2);

        const AllPosts3 = await GetFriendPosts(userID);
        setFriendsIDs(AllPosts3);
      }
    }
    getUserPosts();
  }, [state, userID]);

  // The Intire Posts Component Of The Current User
  let postsList = [...getPosts, ...makePost].map((post) => {
    return (
      <MakePost
        key={post.id}
        user_id={userID + 1772002}
        name={props.name}
        time={post.time}
        user_title={props.title}
        post_content={post.post_content}
        post_id={post.id}
        user_img={props.user_img}
        all_comments={post.comments}
      />
    );
  });

  // Posts For All Users In The Website
  let postsListOfUsers = getPostsForAllUsers.map((data, index) => {
    const allPosts = data.post.map((post) => {
      return (
        <MakePost
          key={post.id + index}
          user_id={+data.user.id + 1772002}
          name={data.user.name}
          time={post.time}
          user_title={post.title}
          post_content={post.post_content}
          post_id={post.id}
          user_img={data.user.user_img}
          user={false}
          all_comments={post.comments}
        />
      );
    });

    return allPosts;
  });

  // Posts For All Users In The Website
  let postsListOfFriends = getPostsForAllUsers
    .map((data, index) => {
      const allPosts = data.post.map((post) => {
        if (getFriendsIDs.includes(+data.user.id)) {
          return (
            <MakePost
              key={post.id + index}
              user_id={+data.user.id + 1772002}
              name={data.user.name}
              time={post.time}
              user_title={post.title}
              post_content={post.post_content}
              post_id={post.id}
              user_img={data.user.user_img}
              user={false}
              all_comments={post.comments}
            />
          );
        } else {
          return null;
        }
      });

      return allPosts;
    })
    .filter((item, index) => item[index] !== null);

  // Flatten the array of posts and shuffle them
  postsListOfUsers = postsListOfUsers.reduce(
    (acc, curr) => acc.concat(curr),
    []
  );

  postsListOfUsers = shuffleArray(postsListOfUsers.reverse());

  // Start Shuffle the friends posts
  postsListOfFriends = postsListOfFriends.reduce(
    (acc, curr) => acc.concat(curr),
    []
  );
  postsListOfFriends = shuffleArray(postsListOfFriends.reverse());
  // End Shuffle the friends posts

  return (
    <div className="outer-mid-section-container">
      <div className="inner-mid-section-container">
        <div className="mid-section-create-post-container">
          {/* User Image */}
          <div className="mid-section-create-post-container-user-img">
            <img src={props.user_img} alt="" />
          </div>
          {/* Textarea */}
          <textarea
            onChange={(e) => {
              setPostContent(e.target.value);
              setFilterPosts(true);
            }}
            value={postContent}
            placeholder="what do you think?"
          ></textarea>
          <div className="mid-section-create-post-btns-container">
            {/* Start The Uploading Image Section */}
            {image ? <ImageUpload e={image} /> : null}
            <label
              htmlFor="photo-upload-in-post"
              className="mid-section-photo-btn"
            >
              <FontAwesomeIcon icon={faImage} />
              &#160;Photo
            </label>
            <input
              style={{ display: "none" }}
              id="photo-upload-in-post"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e);
              }}
            />
            {/* End The Uploading Image Section */}
            {/* Start The Uploading Video Section */}
            {video ? <VideoUpload e={video} /> : null}
            <label htmlFor="video-upload-in-post">
              <FontAwesomeIcon icon={faVideo} />
              &#160;Video
            </label>
            <input
              style={{ display: "none" }}
              id="video-upload-in-post"
              type="file"
              accept="video/*"
              onChange={(e) => {
                setVide(e);
              }}
            ></input>
            {/* End The Uploading Video Section */}
            {/* Start The Uploading File Section */}
            {file ? <PdfUpload e={file} /> : null}
            <label htmlFor="file-upload-in-post">
              <FontAwesomeIcon icon={faFilePdf} />
              &#160;File
            </label>
            <input
              style={{ display: "none" }}
              id="file-upload-in-post"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setFile(e);
              }}
            ></input>
            {/* End The Uploading File Section */}
            {/* Start Post Button */}
            <label
              className="mid-section-post-btn"
              htmlFor="mid-section-post-btn"
            >
              <FontAwesomeIcon icon={faCheckDouble} />
              &#160;Post
            </label>
            <input
              type="submit"
              onClick={() => {
                makePostFunction();
              }}
              id="mid-section-post-btn"
              className="mid-section-post-btn"
              style={{ display: "none" }}
            ></input>
            {/* End Post Button */}
          </div>
        </div>
        <div className="mid-section-post-filter-text">
          <p
            onClick={() => {
              if (filterDisplay === "none") {
                setFilterDisplay("flex");
                setFilterAnimation("FilterAnimationOpen");
              } else {
                setFilterAnimation("FilterAnimationClose");
                setTimeout(() => {
                  setFilterDisplay("none");
                }, 300);
              }
            }}
          >
            filter <FontAwesomeIcon icon={faFilter} size="xs" />
          </p>
        </div>
        <div
          style={{ display: filterDisplay, animationName: filterAnimation }}
          className="mid-section-post-filter"
        >
          <button
            onClick={() => {
              setFilterPosts(false);
            }}
          >
            Global Posts
          </button>
          &#160;&#160;
          <button
            onClick={() => {
              setFilterPosts("connections");
            }}
          >
            Friend Posts
          </button>
          <button
            onClick={() => {
              setFilterPosts(true);
            }}
          >
            My Posts
          </button>
        </div>

        {/* <div className="all-posts-container">{postsList.reverse()}</div> */}
        {filterPosts === false ? (
          <div className="all-posts-container">{postsListOfUsers}</div>
        ) : filterPosts === "connections" ? (
          <>
            <div className="all-posts-container">
              {postsListOfFriends.reverse()}
            </div>
            <div style={{ marginTop: "10px" }} className="all-posts-container">
              {getFriendsIDs.length < 15 ? (
                <AlertDismissibleExample
                  title={`Add 15 friends to see more posts, you now have ${
                    getFriendsIDs.length > 1
                      ? getFriendsIDs.length + " friends"
                      : getFriendsIDs.length + " friend"
                  }`}
                  message="You'll see your friends' photos and updates when they accept your friend request."
                />
              ) : null}
            </div>
          </>
        ) : (
          <div className="all-posts-container">{postsList.reverse()}</div>
        )}
      </div>
    </div>
  );
}
