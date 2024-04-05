import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import {
  GetNetworks,
  addToWaitingList,
  check_connection,
  check_waiting_list,
} from "../APIs/PostAPIs/APIs";
import { Link } from "react-router-dom";

export default function Connection(props) {
  const [net, setNet] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const networks = await GetNetworks(+props.user_id);
      setNet(networks);
    }
    fetchData();
  }, [props.user_id]);

  useEffect(() => {
    async function fetchConnections() {
      const updatedNet = await Promise.all(
        net.map(async (user) => {
          const isConnected = await check_connection(props.user_id, user.id);
          const isWaiting = await check_waiting_list(props.user_id, user.id);
          return {
            ...user,
            isConnected: isConnected === true,
            isWaiting: isWaiting === true,
          };
        })
      );
      setNet(updatedNet);
    }
    if (net.length > 0) {
      fetchConnections();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <>
      {net.map((user) => {
        if (!user.isConnected && !user.isWaiting) {
          return (
            <div className="network-section-connections" key={user.id}>
              <div className="network-section-bg-img">
                <img src={user.user_bg_img} alt="" />
              </div>
              <div className="network-section-all-user-data">
                <Link to={`/profile/${+user.id + 1772002}`}>
                  <div className="network-section-profile-img">
                    <img src={user.user_img} alt="" />
                  </div>
                  <div className="network-section-user-name">{user.name}</div>
                </Link>
                <div className="network-section-user-info">{user.title}</div>
                <div className="network-section-follow-button">
                  <button
                    onClick={() => {
                      addToWaitingList(user.id, props.user_id);
                    }}
                  >
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
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
