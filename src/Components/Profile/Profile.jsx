import "./Style/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEnvelope,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getId } from "../../Redux-TK/Slices/UserId";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  GetProfileData,
  GetUserPosts,
  addRecentView,
  addToWaitingList,
  check_connection,
  check_waiting_list,
  setUserProfileViews,
  unfriend_connection,
} from "../APIs/PostAPIs/APIs";
import MakePost from "../Home/HelpFunctionsForHome/MakePost";
export default function Profile(props) {
  const state = useSelector(getId);
  const userID = state.payload.userId;
  const [is_user_exist, set_is_user_exist] = useState(false);
  const [is_user_in_waiting, set_is_user_in_waiting] = useState(false);
  const [accoundData, setAccountData] = useState(props);

  console.log(accoundData);
  let { ID } = useParams();

  ID = ID - 1772002;

  useEffect(() => {
    async function getAccount() {
      const data = await GetProfileData(ID);
      setAccountData(data);
    }
    getAccount();
  }, [ID]);

  // Store All Posts From API
  const [getPosts, setPosts] = useState([]);

  // Get Posts For The Current User From API
  useEffect(() => {
    async function getUserPosts() {
      if (ID !== 0) {
        const AllPosts = await GetUserPosts(ID);
        setPosts(AllPosts);
      }
    }
    getUserPosts();
  }, [state, ID]);

  useEffect(() => {
    if (ID !== userID) {
      setUserProfileViews(ID);
    }
    async function is_user_existing() {
      const result = await check_connection(userID, ID);
      const result2 = await check_waiting_list(userID, ID);

      set_is_user_exist(result);
      set_is_user_in_waiting(result2);
    }
    is_user_existing();
  }, [ID, userID]);

  useEffect(() => {
    if (props.name !== null) {
      console.log("Name ", props.name);
      addRecentView(userID, props.name);
    }
  }, [props.name, ID, userID]);

  // The Intire Posts Component Of The Current User
  let postsList = [...getPosts].map((post, index) => {
    return (
      <MakePost
        key={post.id}
        user_id={ID + 1772002}
        name={accoundData.name}
        time={post.time}
        user_title={accoundData.title}
        post_content={post.post_content}
        post_id={post.id}
        user_img={accoundData.user_img}
        all_comments={post.comments}
      />
    );
  });

  return (
    <>
      <div className="profile-outer-container">
        <div className="profile-inner-container">
          {/* Start Profile Upper Section */}
          <div className="profile-upper-section">
            <div className="profile-bg-container">
              <img src={accoundData.user_bg_img} alt="" />
            </div>
            <div className="profile-user-info">
              <div className="profile-user-img-container">
                <img src={accoundData.user_img} alt="" />
              </div>
              <div className="profile-user-name">{accoundData.name}</div>
              <div className="profile-user-about">{accoundData.title}</div>

              <div className="profile-spacer1"></div>
              {parseInt(userID) !== parseInt(ID) ? (
                <div className="profile-btns">
                  {!is_user_exist ? (
                    !is_user_in_waiting ? (
                      <button
                        onClick={() => {
                          addToWaitingList(ID, userID);
                        }}
                        className="profile-connect-btn"
                      >
                        <FontAwesomeIcon icon={faUserPlus} /> &#160; Connect
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toast.info(
                            `Hey there! Looks like ${props.name} wants to be your friend, but you're leaving them hanging!`,
                            {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                              toastStyle: {
                                background: "#333",
                                color: "#fff",
                                borderRadius: "8px",
                              },
                            }
                          );
                        }}
                        className="profile-connect-btn"
                        style={{
                          backgroundColor: "green",
                          width: "fit-content",
                        }}
                      >
                        Check Notifications
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        Swal.fire({
                          title:
                            "Do you want to complete the deletion process?",
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
                              title: `${props.name} has been deleted`,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            unfriend_connection(userID, ID);
                            set_is_user_exist(false);
                          }
                        });
                      }}
                      className="profile-connect-btn"
                      style={{ backgroundColor: "red" }}
                    >
                      <FontAwesomeIcon icon={faUserXmark} /> &#160; Unfriend
                    </button>
                  )}

                  <button className="profile-message-btn">
                    <FontAwesomeIcon icon={faEnvelope} />
                    &#160; Messages
                  </button>
                </div>
              ) : (
                <div className="profile-user-replaced-buttons">
                  <p>Profile views: {props.profile_views}</p>
                  <p>Post views: {props.post_views}</p>
                  <p>Connections: {props.connections}</p>
                </div>
              )}
            </div>
          </div>
          {/*End Profile Upper Section */}

          <div></div>

          {/* Start Profile About Section */}
          <div className="profile-about-section">
            <h3>About</h3>
            <p>{accoundData.about}</p>
          </div>
          {/* End Profile About Section */}

          {/* Start User Posts */}
          <div className="profile-posts-section">
            <h3>Posts</h3>
            <div className="profile-posts-section-inner">
              {postsList.reverse()}
            </div>
          </div>
          {/* End User Posts */}

          {/* Start Profile Experiance */}
          <div className="profile-experiance-section">
            <h3 className="profile-experiance-title">Experiance</h3>
            <div className="profile-experiance-container">
              {/* Experiance 1 */}
              <div className="experiance">
                <div className="profile-experiance-image">
                  <img src="Assets/logo.png" alt="" />
                </div>
                <div className="profile-experiance-body">
                  <h5 style={{ display: "inline" }}>
                    Lead Front-End Developer
                  </h5>
                  <br />
                  <p style={{ display: "inline" }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Reiciendis suscipit aperiam labore ab odio aliquam. Natus ex
                    nulla possimus non!
                  </p>
                </div>
              </div>

              {/* Line Brack */}
              <br />
              <div className="profile-experiance-end"></div>
              <br />
              {/* Line Brack */}
            </div>
          </div>
          {/* End Profile Experiance */}

          {/* Start Profile Education */}
          <div className="profile-education-section">
            <h3 className="profile-education-title">Education</h3>
            <div className="profile-education-container">
              {/* Education 1 */}
              <div className="education">
                <div className="profile-education-image">
                  <img src="Assets/logo.png" alt="" />
                </div>
                <div className="profile-education-body">
                  <h5 style={{ display: "inline" }}>
                    Egyptian Russian University
                  </h5>
                  <br />
                  <p style={{ display: "inline" }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Reiciendis suscipit aperiam labore ab odio aliquam. Natus ex
                    nulla possimus non!
                  </p>
                </div>
              </div>

              {/* Line Brack */}
              <br />
              <div className="profile-education-end"></div>
              <br />
              {/* Line Brack */}
            </div>
          </div>
          {/* End Profile Education */}

          {/* Start Profile Skills*/}
          <div className="profile-skills-section">
            <h3>Skills</h3>
            <div className="skills-container">
              <div className="skill">Developer</div>
              <div className="skill">Java</div>
              <div className="skill">Python</div>
              <div className="skill">HTML</div>
              <div className="skill">React.js</div>
              <div className="skill">CSS</div>
              <div className="skill">JavaScript</div>
            </div>
          </div>
          {/* End Profile Skills*/}

          {/* Start Profile Language*/}
          <div className="profile-language-section">
            <h3>Language</h3>
            <div className="language-container">
              <div className="language">English</div>
              <div className="language">Arablic</div>
              <div className="language">Spanish</div>
            </div>
          </div>
          {/* End Profile Language */}
        </div>
      </div>
    </>
  );
}
