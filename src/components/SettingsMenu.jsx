import { useState } from "react";

const SettingsMenu = ({ onUpdate }) => {
  const [fontSize, setFontSize] = useState("18px");
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [bgColor, setBgColor] = useState("#F5F5F5");

  const applyChanges = () => {
    onUpdate({ fontSize, fontFamily, backgroundColor: bgColor });
  };

  return (
    <div style={{ padding: "10px", background: "#ddd" }}>
      <h3>Game Settings</h3>

      <label>Font Size:</label>
      <input
        type="number"
        value={parseInt(fontSize)}
        onChange={(e) => setFontSize(`${e.target.value}px`)}
      />

      <label>Font Style:</label>
      <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
        <option value="Arial, sans-serif">Default</option>
        <option value="'OpenDyslexic', sans-serif">Dyslexic Font</option>
      </select>

      <label>Background Color:</label>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />

      <button onClick={applyChanges}>Apply</button>
    </div>
  );
};

export default SettingsMenu;
