import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGlobe,
  faEnvelope,
  faBell,
  faMagnifyingGlass,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "./Notification";
import { Link } from "react-router-dom";
import { createContext, useState } from "react";

export const MyContext = createContext();

export default function NavBar(props) {
  const [showNotificaation, setShowNotification] = useState("hidden");

  const [itemsColor, setItemsColor] = useState({
    home: "gold",
    net: "white",
    job: "white",
    message: "white",
    noti: "white",
    search: "white",
  });
  const user = "teatcher";

  return (
    <MyContext.Provider value={showNotificaation}>
      <div className="nav-outer-container">
        <div className="nav-inner-container">
          <div className="nav-logo-container">
            <img src="/Assets/logo.png" alt="logo" className="nav-logo" />
          </div>
          <div className="nav-links-container">
            <Link
              onClick={() => {
                setItemsColor({
                  home: "gold",
                  net: "white",
                  job: "white",
                  message: "white",
                  noti: "white",
                  search: "white",
                });
              }}
              style={{ color: itemsColor.home }}
              className="nav-home"
              to="/"
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="nav-items-name"> Home</span>
            </Link>
            <Link
              onClick={() => {
                setItemsColor({
                  home: "white",
                  net: "gold",
                  job: "white",
                  message: "white",
                  noti: "white",
                  search: "white",
                });
              }}
              style={{ color: itemsColor.net }}
              className="nav-network"
              to="/my-networks"
            >
              <FontAwesomeIcon icon={faGlobe} />
              <span className="nav-items-name"> My Network</span>
            </Link>
            {user === "teatcher" ? (
              <Link
                onClick={() => {
                  setItemsColor({
                    home: "white",
                    net: "white",
                    job: "gold",
                    message: "white",
                    noti: "white",
                    search: "white",
                  });
                }}
                style={{ color: itemsColor.job }}
                className="nav-message"
                to="/job-apps"
              >
                <FontAwesomeIcon icon={faBriefcase} />
                <span className="nav-items-name"> Job Apps</span>
              </Link>
            ) : null}

            <a
              onClick={() => {
                setItemsColor({
                  home: "white",
                  net: "white",
                  job: "white",
                  message: "gold",
                  noti: "white",
                  search: "white",
                });
              }}
              style={{ color: itemsColor.message }}
              className="nav-message"
              href="/contact"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="nav-items-name"> Messaging</span>
            </a>
            <p
              onClick={() => {
                if (showNotificaation === "visible") {
                  setShowNotification("hidden");
                } else {
                  setShowNotification("visible");
                }
              }}
              style={{ cursor: "pointer", color: "white" }}
              className="nav-notification"
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="nav-items-name"> Notification</span>
            </p>
            <a
              onClick={() => {
                setItemsColor({
                  home: "white",
                  net: "white",
                  job: "white",
                  message: "white",
                  noti: "white",
                  search: "gold",
                });
              }}
              style={{ color: itemsColor.search }}
              className="nav-search"
              href="/resume"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span className="nav-items-name"> Search</span>
            </a>
          </div>
          <div className="nav-user-img-container">
            <Link to={`/profile/${parseInt(props.user_id) + 1772002}`}>
              <img src={props.user_img} alt="user" className="nav-logo" />
            </Link>
          </div>
        </div>
      </div>
      <Notifications />
    </MyContext.Provider>
  );
}
