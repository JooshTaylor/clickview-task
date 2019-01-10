import React, { Component } from "react";

class DisciplineList extends Component {
  state = {
    level: "",
    subject: "",
    disciplines: [],
    videos: []
  };

  componentDidMount() {
    let disciplines = [];
    this.setState(
      {
        level: this.props.level,
        subject: this.props.subject
      },
      () => {
        this.props.videos.forEach(video => {
          if (
            this.state.level === video.folder.split("->")[0] &&
            this.state.subject === video.folder.split("->")[1] &&
            video.folder.split("->")[2] !== undefined &&
            !disciplines.includes(video.folder.split("->")[2])
          ) {
            disciplines.push(video.folder.split("->")[2]);
          }
        });
        this.setState({ disciplines });
      }
    );
  }

  renderDisciplines() {
    if (this.state.disciplines.length > 0) {
      return this.state.disciplines.map((discipline, index) => (
        <li
          key={index}
          className="discipline"
          onClick={() => {
            this.props.updateVideos(
              this.state.level,
              this.state.subject,
              discipline
            );
          }}
        >
          {discipline}
        </li>
      ));
    } else {
      return null;
    }
  }

  render() {
    return <ul className="discipline__list">{this.renderDisciplines()}</ul>;
  }
}
export default DisciplineList;
