import React from "react";

const GameColorColumn = ({
  color,
  children,
  columnsNumber,
  startScreenVisible
}) => (
  <div
    className={`column${
      columnsNumber ? ` columns-inside columns-${columnsNumber}` : ""
    }${startScreenVisible ? " start-screen-visible" : ""}`}
    style={{ borderColor: color }}
  >
    {children}
  </div>
);
export default GameColorColumn;
