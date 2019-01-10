import React, { Component } from "react";
import DisciplineList from "../DisciplineList/DisciplineList";

class SubjectList extends Component {
  state = {
    level: "",
    subjects: [],
    videos: []
  };

  componentDidMount() {
    let subjects = [];
    this.setState({ level: this.props.level }, () => {
      this.props.videos.forEach(video => {
        if (
          this.state.level === video.folder.split("->")[0] &&
          !subjects.includes(video.folder.split("->")[1])
        ) {
          subjects.push(video.folder.split("->")[1]);
        }
      });
      this.setState({ subjects });
    });
  }

  loadVideos = subject => {
    this.setState({
      videos: this.props.videos
        .filter(video => video.folder.split("->")[0] === this.state.level)
        .filter(video => video.folder.split("->")[1] === subject)
    });
  };

  renderSubjects() {
    if (this.state.subjects.length > 0) {
      return this.state.subjects.map((subject, index) => (
        <li key={index} className="subject">
          <div
            onClick={() => {
              this.props.toggleSubjectCollapse(this.state.level, subject);
            }}
          >
            <p
              onClick={() => {
                this.props.updateVideos(this.state.level, subject);
              }}
              className="level__name"
            >
              {subject}
            </p>
            {this.props.uncollapsedSubjects.includes(
              `${this.state.level}, ${subject}`
            ) ? (
              <i className="fas fa-angle-down angle" />
            ) : (
              <i className="fas fa-angle-right angle" />
            )}
          </div>
          {this.props.uncollapsedSubjects.includes(
            `${this.state.level}, ${subject}`
          ) ? (
            <DisciplineList
              key={index}
              videos={this.props.videos}
              level={this.state.level}
              subject={subject}
              updateVideos={this.props.updateVideos}
            />
          ) : null}
        </li>
      ));
    } else {
      return <div>Loading</div>;
    }
  }

  render() {
    return <ul className="subject__list">{this.renderSubjects()}</ul>;
  }
}

export default SubjectList;
