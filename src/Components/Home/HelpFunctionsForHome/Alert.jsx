import { useState } from "react";

const style_outer_container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "150px",
  width: "inherit",
  padding: "15px 30px",
  backgroundColor: "#F8D7DA",
  borderRadius: "7px",
  border: "1px solid rgba(255, 0, 0, 0.2)",
  marginBottom: "10px",
};

const style_close_button = {
  color: "#58151C",
  fontSize: "15px",
  width: "100%",
  marginRight: "10px",
  marginBottom: "5px",
  marginTop: "10px",
  textAlign: "right",
  cursor: "pointer",
};

const style_hidder_container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#58151C",
  fontSize: "24px",
  width: "100%",
  fontWeight: "600",
  marginBottom: "7px",
};

const style_message_container = {
  textAlign: "start",
  width: "100%",
  color: "#58151C",
  fontSize: "15px",
  marginBottom: "7px",
};

const style_show_button = {
  color: "#fff",
  fontSize: "15px",
  backgroundColor: "blue",
  border: "none",
  width: "100px",
  height: "30px",
  borderRadius: "5px",
  marginBottom: "10px",
  cursor: "pointer",
};

export default function AlertDismissibleExample(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div style={style_outer_container} className="alert-outer-container">
        <div
          style={style_close_button}
          onClick={() => setShow(false)}
          className="alert-close-button"
        >
          ❌
        </div>
        <div style={style_hidder_container} className="alert-title">
          {props.title}
        </div>
        <div style={style_message_container} className="alert-message">
          {props.message}
        </div>
      </div>
    );
  }
  return (
    <button style={style_show_button} onClick={() => setShow(true)}>
      Show
    </button>
  );
}
