import React from "react";
import "./VideoItem.css";

const VideoItem = ({ video }) => {
  return (
    <li className="video">
      <div className="video__thumbnail-box">
        <img
          className="video__thumbnail"
          src={video.thumbnail}
          alt="Video Thumbnail"
        />
      </div>
      <div className="video__details">
        <h2 className="video__title">{video.name}</h2>
        <p className="video__description">{video.description}</p>
      </div>
    </li>
  );
};

export default VideoItem;
