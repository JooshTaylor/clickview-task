import React, { Component } from "react";
import TagItem from "../TagItem/TagItem";

class TagFilters extends Component {
  state = {
    tags: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps.videos !== this.props.videos) {
      let tags = [];
      this.props.videos.forEach(video => {
        video.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      });

      this.setState({ tags });
    }
  }

  renderTags() {
    if (this.state.tags) {
      return this.state.tags.map(tag => (
        <TagItem key={tag} updateTags={this.props.updateTags} tag={tag} />
      ));
    } else {
      return <p>hi</p>;
    }
  }

  render() {
    return <ul>{this.renderTags()}</ul>;
  }
}
export default TagFilters;
