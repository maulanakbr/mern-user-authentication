import React from "react";

const Notification = ({ error }) => {
  return (
    <div className="mt-1 text-center text-xs text-red-scarlet">
      Failed: {error}
    </div>
  );
};

export default Notification;
