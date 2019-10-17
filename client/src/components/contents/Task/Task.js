import React, { Component } from "react";
import moment from "moment";
import "./Task.css";

export default class Task extends Component {
  render() {
    return (
      <div className="taskItemComponent">
        <input
          type="checkbox"
          checked={this.props.task.done}
          onChange={() => this.props.updateTaskValue(this.props.task)}
        ></input>
        <span
          style={{ textDecoration: this.props.task.done ? "line-through" : "" }}
        >
          {moment(this.props.task.createdAt).format("DD/MM hh:mm")}
        </span>
        <span
          style={{ textDecoration: this.props.task.done ? "line-through" : "" }}
        >
          {this.props.task.name}
        </span>
        <button onClick={() => this.props.deleteTask(this.props.task)}>
          Delete
        </button>
      </div>
    );
  }
}
