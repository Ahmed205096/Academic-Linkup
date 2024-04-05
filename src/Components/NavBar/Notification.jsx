import { useSelector } from "react-redux";
import { Accept_Reject, getFromWaitingList } from "../APIs/PostAPIs/APIs";
import "./Notification.css";
import { getId } from "../../Redux-TK/Slices/UserId";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./NavBar";
import { Link } from "react-router-dom";

export default function Notifications() {
  const state = useSelector(getId);
  const userID = state.payload.userId;
  const [WaitingList, setWaitingList] = useState([]);

  const open_notification = useContext(MyContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getWaitingList() {
    const result = await getFromWaitingList(userID);
    setWaitingList(result);
  }

  useEffect(() => {
    getWaitingList();
  }, [getWaitingList, userID]);

  if (WaitingList !== undefined && open_notification === "visible") {
    const output_for_notefication = WaitingList.map((data) => {
      return (
        <div key={data.id} className="notification-content">
          <div className="notification-user-info-outer-container">
            <div className="notification-user-info">
              <Link to={`profile/${1772002 + +data.id}`}>
                <div className="notification-user-image">
                  <img src={data.img} alt="" />
                </div>
                <div className="notification-user-name">{data.name}</div>
              </Link>
            </div>
            {true ? (
              <div className="notification-add-friend">
                <button
                  onClick={() => {
                    Accept_Reject(userID, data.id, true);
                    getWaitingList();
                  }}
                >
                  ✅
                </button>
                <button
                  onClick={() => {
                    Accept_Reject(userID, data.id, false);
                    getWaitingList();
                  }}
                >
                  ❌
                </button>
              </div>
            ) : null}
          </div>
          <div className="notification-user-title">{data.title}</div>
          <hr />
        </div>
      );
    });

    return (
      <>
        {output_for_notefication.length > 0 ? (
          <div className="outer-container-notification">
            <div className="notification-container">
              {/* Notification 1 */}
              {output_for_notefication}
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
