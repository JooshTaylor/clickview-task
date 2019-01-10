import React, { Component } from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";
import VideoList from "./components/Videos/VideoList/VideoList";

class App extends Component {
  state = {
    videos: [],
    filteredVideos: [],
    activeTags: []
  };

  componentDidMount() {
    this.setState({ videos: window.videos });
  }

  updateVideos = (level, subject, discipline = null) => {
    let vids = this.state.videos
      .filter(video => video.folder.split("->")[0] === level)
      .filter(video => video.folder.split("->")[1] === subject);

    if (discipline) {
      vids = vids.filter(vid => vid.folder.split("->")[2] === discipline);
    }

    this.setState({ filteredVideos: vids });
  };

  updateTags = tagName => {
    if (this.state.activeTags.includes(tagName)) {
      const targetIndex = this.state.activeTags.indexOf(tagName);
      this.setState({
        activeTags: this.state.activeTags.filter(
          tagName => this.state.activeTags.indexOf(tagName) !== targetIndex
        )
      });
    } else {
      this.setState({ activeTags: [...this.state.activeTags, tagName] });
    }
  };

  render() {
    return (
      <div>
        <p>Home page</p>
        <div className="video-container">
          <Filters
            videos={this.state.videos}
            updateVideos={this.updateVideos}
            updateTags={this.updateTags}
          />
          <VideoList
            tags={this.state.activeTags}
            videos={this.state.filteredVideos}
          />
        </div>
      </div>
    );
  }
}

export default App;
