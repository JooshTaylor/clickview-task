import React, { Component } from "react";
import "./TagItem.css";

class TagItem extends Component {
  onClick = e => {
    this.props.updateTags(this.props.tag);
  };

  render() {
    return (
      <div>
        <p className="tag" onClick={this.onClick}>
          {this.props.tag}
        </p>
        {this.props.activeTags.includes(this.props.tag) ? (
          <i className="fas fa-check" />
        ) : null}
      </div>
    );
  }
}

export default TagItem;
