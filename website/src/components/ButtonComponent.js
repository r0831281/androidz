import React from "react";
import "../index.css";

const ButtonComponent = ({ text, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="attention-grabber-button"
    >
      {text}
    </a>
  );
};
export default ButtonComponent;