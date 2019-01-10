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
      </div>
    );
  }
}

export default TagItem;
