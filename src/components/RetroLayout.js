import React from "react";

const RetroLayout = ({ children }) => {
  const scanLine = key => <div className="scan-line" key={key}></div>;
  const scanLines = [];
  for (let i = 0; i < 100; i++) {
    //50
    const scanLineWithKey = scanLine(i);
    scanLines.push(scanLineWithKey);
  }
  return (
    <div className="retro-layout">
      <div className="retro-layout-inside">
        <div className="scan-lines">{scanLines}</div>
        {children}
      </div>
    </div>
  );
};

export default RetroLayout;
