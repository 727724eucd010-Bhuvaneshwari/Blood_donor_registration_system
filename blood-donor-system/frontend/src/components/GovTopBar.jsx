import { useState } from "react";
import { FaUniversalAccess } from "react-icons/fa";

function GovTopBar() {
  const [fontScale, setFontScale] = useState(100);

  const applyFont = (size) => {
    setFontScale(size);
    document.documentElement.style.fontSize = `${size}%`;
  };

  return (
    <div className="gov-topbar">
      <div className="container">
        <div>
          <a href="#main-content">Skip to Main Content</a>
          <span style={{ opacity: 0.4 }}>|</span>
          <FaUniversalAccess style={{ margin: "0 4px" }} />
          <span>Screen Reader Access</span>
        </div>
        <div className="d-flex align-items-center">
          <span className="gov-font-controls">
            <span onClick={() => applyFont(90)}>A-</span>
            <span onClick={() => applyFont(100)}>A</span>
            <span onClick={() => applyFont(115)}>A+</span>
          </span>
          <span style={{ opacity: 0.4, margin: "0 6px" }}>|</span>
          <button type="button">English</button>
          <button type="button">हिन्दी</button>
        </div>
      </div>
    </div>
  );
}

export default GovTopBar;
