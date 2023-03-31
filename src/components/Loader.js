import React from "react";
const Loader = (props) => {
  const { isSmall = false } = props;
  return (
    <div
      className={`text-dark d-flex justify-content-center ${
        isSmall ? "" : "my-5"
      }`}>
      <div
        className={`spinner-border ${isSmall ? "spinner-border-sm" : ""}`}
        role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
