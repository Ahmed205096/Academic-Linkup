import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import MyNetworks from "./Components/MyNetwork/MyNetwork";
import ProfileWithBar from "./Components/Profile/ProfileWithBar";
import JobsGeneral from "./Components/JobAppsApply/JobsGeneral";
import TeacherData from "./InitializeData/Teachers";
import { setId } from "./Redux-TK/Slices/UserId";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUserInfo } from "./Redux-TK/Slices/CurrentUserInfo";
import Notifications from "./Components/NavBar/Notification";
import { toast } from "react-toastify";

function App() {
  const userID = 2;
  const teacher_data = TeacherData(userID);
  const [showWelcome, setWelcomeState] = useState(true);

  
  useEffect(() => {
    if (showWelcome) {
      toast.success("Academic Linkup.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setWelcomeState(false);
    }
  }, [showWelcome, userID]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setId(userID));
    dispatch(
      setUserInfo({
        id: teacher_data.id,
        name: teacher_data.name,
        img: teacher_data.user_img,
      })
    );
  }, [
    dispatch,
    teacher_data.id,
    teacher_data.name,
    teacher_data.user_img,
    userID,
  ]);
  try {
    return (
      <div className="App">
        <NavBar user_img={teacher_data.user_img} user_id={teacher_data.id} />
        <div className="app-separator1" />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user_bg_img={teacher_data.user_bg_img}
                user_img={teacher_data.user_img}
                name={teacher_data.name}
                title={teacher_data.title}
                profile_views={teacher_data.profile_views}
                post_views={teacher_data.post_views}
                connections={teacher_data.connections}
                time={teacher_data.time}
                user_id={userID}
              />
            }
          />
          <Route
            path="/my-networks"
            element={
              <MyNetworks
                user_bg_img={teacher_data.user_bg_img}
                user_img={teacher_data.user_img}
                name={teacher_data.name}
                title={teacher_data.title}
                profile_views={teacher_data.profile_views}
                post_views={teacher_data.post_views}
                connections={teacher_data.connections}
                utime={teacher_data.time}
                user_id={teacher_data.id}
              />
            }
          />
          <Route
            path="/profile/:ID"
            element={
              <ProfileWithBar
                user_bg_img={teacher_data.user_bg_img}
                user_img={teacher_data.user_img}
                name={teacher_data.name}
                title={teacher_data.title}
                about={teacher_data.about}
                profile_views={teacher_data.profile_views}
                post_views={teacher_data.post_views}
                connections={teacher_data.connections}
              />
            }
          />

          <Route
            path="/job-apps"
            element={
              <JobsGeneral
                user_bg_img={teacher_data.user_bg_img}
                user_img={teacher_data.user_img}
                name={teacher_data.name}
                title={teacher_data.title}
                profile_views={teacher_data.profile_views}
                post_views={teacher_data.post_views}
                connections={teacher_data.connections}
                time={teacher_data.time}
                user_id={teacher_data.id}
              />
            }
          />
        </Routes>

        <Notifications />

        <div className="app-separator2" />
      </div>
    );
  } catch (e) {
    console.log(e);
  }
}

export default App;
