import React, { Component } from "react";
import moment from "moment";
import "./Task.css";

export default class Task extends Component {
  render() {
    return (
      <div className="taskItemComponent">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={this.props.task.done}
            onChange={() => this.props.updateTaskValue(this.props.task)}
          ></input>
        </div>
        <div className="task-created">
          <span
            style={{
              textDecoration: this.props.task.done ? "line-through" : ""
            }}
          >
            {moment(this.props.task.createdAt).format("DD/MM hh:mm")}
          </span>
        </div>
        <div className="task-title">
          <span
            style={{
              textDecoration: this.props.task.done ? "line-through" : ""
            }}
          >
            {this.props.task.name}
          </span>
        </div>
        <div className="task-button">
          <button onClick={() => this.props.deleteTask(this.props.task)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
