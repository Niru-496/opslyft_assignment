import React from "react";

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "25px", height: "25px" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};


