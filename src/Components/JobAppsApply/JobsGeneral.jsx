import LeftSection from "../Home/LeftSection";
import TeatcherJob from "./TeatcherJob";
import "./Style/JobAppsApply.css";
import { useEffect, useState } from "react";
import { getAllUserInfo } from "../APIs/PostAPIs/APIs";

export default function JobsGeneral(props) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (props.user_id !== undefined) {
      async function getUserData() {
        const user_data = await getAllUserInfo(props.user_id);
        setUserData(user_data);
      }
      getUserData();
    }
  }, [props.user_id]);
  return (
    <div className="app-home">
      <LeftSection
        user_bg_img={props.user_bg_img}
        user_img={props.user_img}
        name={props.name}
        title={props.title}
        profile_views={props.profile_views}
        post_views={props.post_views}
        connections={userData !== undefined ? userData.friend_list.length : 0}
        user_id={props.user_id}
      />
      <TeatcherJob />
    </div>
  );
}
