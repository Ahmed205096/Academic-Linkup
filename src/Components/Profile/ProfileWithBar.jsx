import { useParams } from "react-router-dom";
import TeacherData from "../../InitializeData/Teachers";
import "../Home/RightSection";
import RightSection from "../Home/RightSection";
import Profile from "./Profile";

export default function ProfileWithBar() {
  const { ID } = useParams();
  const teacher_data = TeacherData(ID-1772002);
  return (
    <>
      <div className="app-home">
        <Profile
          user_bg_img={teacher_data.user_bg_img}
          user_img={teacher_data.user_img}
          name={teacher_data.name}
          title={teacher_data.title}
          about={teacher_data.about}
          profile_views={teacher_data.profile_views}
          post_views={teacher_data.post_views}
          connections={teacher_data.connections}
        />
        <RightSection />
      </div>
    </>
  );
}
