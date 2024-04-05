import Connection from "./Connection";

export default function MyNet(props) {
  return (
    <div className="networks-section-outer-container">
      <div className="networks-section-inner-container">
        <Connection user_id={props.user_id} />
      </div>
    </div>
  );
}
