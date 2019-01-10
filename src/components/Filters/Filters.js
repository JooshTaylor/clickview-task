import React, { Component } from "react";
import "./Filters.css";
import SubjectList from "./SubjectList/SubjectList";
import TagFilters from "./TagFilters/TagFilters";

class Navigation extends Component {
  state = {
    uncollapsedLevels: [],
    uncollapsedSubjects: []
  };

  toggleLevelCollapse = level => {
    if (!this.state.uncollapsedLevels.includes(level)) {
      this.setState({
        uncollapsedLevels: [...this.state.uncollapsedLevels, level]
      });
    } else {
      const targetIndex = this.state.uncollapsedLevels.indexOf(level);
      this.setState({
        uncollapsedLevels: this.state.uncollapsedLevels.filter(
          level => this.state.uncollapsedLevels.indexOf(level) !== targetIndex
        )
      });
    }
  };

  toggleSubjectCollapse = (level, subject) => {
    let pair = `${level}, ${subject}`;
    if (!this.state.uncollapsedSubjects.includes(pair)) {
      const uncollapsedSubjects = this.state.uncollapsedSubjects;
      uncollapsedSubjects.push(pair);
      this.setState({
        uncollapsedSubjects
      });
    } else {
      const targetIndex = this.state.uncollapsedSubjects.indexOf(pair);
      this.setState({
        uncollapsedSubjects: this.state.uncollapsedSubjects.filter(
          pair => this.state.uncollapsedSubjects.indexOf(pair) !== targetIndex
        )
      });
    }
  };

  renderLevels() {
    let levels = [];
    this.props.videos.forEach(video => {
      if (!levels.includes(video.folder.split("->")[0])) {
        levels.push(video.folder.split("->")[0]);
      }
    });
    return levels.map((level, index) => (
      <li key={index} className="level">
        <div
          onClick={() => {
            this.toggleLevelCollapse(level);
          }}
        >
          <p className="level__name">{level}</p>
          {this.state.uncollapsedLevels.includes(level) ? (
            <i className="fas fa-angle-down angle" />
          ) : (
            <i className="fas fa-angle-right angle" />
          )}
        </div>
        {this.state.uncollapsedLevels.includes(level) ? (
          <SubjectList
            key={index}
            videos={this.props.videos}
            level={level}
            uncollapsedSubjects={this.state.uncollapsedSubjects}
            toggleSubjectCollapse={this.toggleSubjectCollapse}
            updateVideos={this.props.updateVideos}
          />
        ) : null}
      </li>
    ));
  }

  render() {
    return (
      <div className="categories">
        <h2 className="levels__heading">Categories</h2>
        <ul className="levels__list">{this.renderLevels()}</ul>
        <hr />
        <h2 className="levels__heading">Tags</h2>
        <TagFilters
          updateTags={this.props.updateTags}
          videos={this.props.videos}
        />
      </div>
    );
  }
}

export default Navigation;
