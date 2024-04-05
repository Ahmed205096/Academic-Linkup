import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";


export default function JobsApply() {
  return (
    <>
      <div className="job-app-section-connections">
        <div className="job-app-section-bg-img">
          <img src="/Assets/back.jpg" alt="" />
        </div>
        <div className="job-app-section-all-user-data">
          <div className="job-app-section-profile-img">
            <img src="Assets/user.png" alt="" />
          </div>
          <div className="job-app-section-user-name">Linkup Team</div>
          <div className="job-app-section-user-info">
            Web Developer At Microsoft Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Perferendis, expedita!{" "}
          </div>
          <div className="job-app-section-follow-button">
            <button>
              Connect{" "}
              <FontAwesomeIcon
                icon={faConnectdevelop}
                pulse={true}
                color="gray"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
