import "./Styles/RightSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

export default function RightSection() {
  return (
    <div className="right-section-outer-container">
      <div className="right-section-inner-container">
        <div className="right-section-title">
          Recommended for you &#160;
          <span>
            <FontAwesomeIcon icon={faInfo} />
          </span>
        </div>

        <div className="right-section-separator1" />
        <div className="right-section-recommendation-list">
          <div className="right-section-recommended-person">
            <span>
              <img src="Assets/user.png" alt="" /> &#160; Linkup Team
            </span>
            {/* عشان السليكتور ميغيرش لون الزرار لانه يعتبر زوجي الرقم */}
            <p></p>
            <button>Follow</button>
          </div>
          <div className="right-section-recommended-person">
            <span>
              <img src="Assets/user.png" alt="" /> &#160; Linkup Team
            </span>
            <p></p>
            <button>Follow</button>
          </div>
          <div className="right-section-recommended-person">
            <span>
              <img src="Assets/user.png" alt="" /> &#160; Linkup Team
            </span>
            <p></p>

            <button>Follow</button>
          </div>
          <div className="right-section-recommended-person">
            <span>
              <img src="Assets/user.png" alt="" /> &#160; Linkup Team
            </span>
            <p></p>

            <button>Follow</button>
          </div>
        </div>
        <div className="right-section-separator2" />
        <div className="right-section-ad">
          <div className="right-section-ad-title">
            Ad &middot;&middot;&middot;
          </div>
          <p className="right-section-ad-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            culpa?
          </p>
          <div className="right-section-ad-image">
            <img src="Assets/ad.jpg" alt="" />
          </div>
          <div className="right-section-btn-ad">
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
