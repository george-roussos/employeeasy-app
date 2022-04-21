import "./Message.css";

import React from "react";
import { useSelector } from "react-redux";

const Message = () => {
  const notification = useSelector((state) => state.message);
  const style = useSelector((state) => state.messageStyle);

  if (notification === null) {
    return null;
  }
  return <div className={`${style}`}>{notification}</div>;
};

export default Message;
