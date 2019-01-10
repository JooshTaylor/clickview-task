import React, { Component } from "react";
import "./VideoList.css";
import VideoItem from "../VideoItem/VideoItem";

class VideoList extends Component {
  state = {
    videos: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos) {
      this.setState({ videos: this.props.videos });
    }
  }

  renderVideos() {
    if (this.state.videos) {
      return this.state.videos.map(video => {
        if (this.props.tags.length === 0) {
          return <VideoItem video={video} />;
        } else {
          for (let i = 0; i < video.tags.length; i++) {
            if (this.props.tags.includes(video.tags[i])) {
              return <VideoItem video={video} />;
            } else {
              return null;
            }
          }
        }
      });
    } else {
      return <p>test</p>;
    }
  }

  render() {
    return <ul className="videos">{this.renderVideos()}</ul>;
  }
}

export default VideoList;
