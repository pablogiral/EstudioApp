import React, { Component } from "react";
import Task from "./Task";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ViewTasks.css";
export default class ViewTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      bandname: "",
      comments: "",
      projectimage: "",
      tasks: [],
      newTask: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/taskRoutes/projectTasks/${this.props.match.params.id}`
      )
      .then(tasksFromBackend => {
        // debugger
        this.setState({
          ...this.state,
          tasks: tasksFromBackend.data.tasks,
          bandname: tasksFromBackend.data.bandname,
          projectname: tasksFromBackend.data.name,
          comments: tasksFromBackend.data.comments,
          projectimage: tasksFromBackend.data.projectimage
        });
      });
  }

  addNewTask() {
    if (this.state.newTask === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/taskRoutes/newTask`, {
        name: this.state.newTask,
        projectID: this.props.match.params.id
      })
      .then(tasksFromBackend => {
        this.setState({
          ...this.state,
          tasks: tasksFromBackend.data.tasks,
          newTask: ""
        });
      });
  }

  setNewTaskValue(e) {
    this.setState({
      ...this.state,
      newTask: e.target.value
    });
  }

  updateTaskValue(taskToUpdate) {
    // this clones the tasks from the state
    let tasks = [...this.state.tasks];

    // this finds the selected task to be modified
    let taskToUpdateFromState = tasks.find(
      task => task._id === taskToUpdate._id
    );
    let newDoneState = !taskToUpdateFromState.done;

    let URL = `${process.env.REACT_APP_API_URL}/api/taskRoutes/task/${taskToUpdate._id}/done/${newDoneState}/project/${this.props.match.params.id}`;

    axios.get(URL).then(allTasks => {
      // this re-updates the state with updated object, hence updating the checkbox
      this.setState({
        ...this.state,
        tasks: allTasks.data.tasks
      });
    });
  }

  deleteTask(taskToDelete) {
    let tasks = [...this.state.tasks];
    let taskToDeleteFromState = tasks.filter(
      task => task._id !== taskToDelete._id
    );
    this.setState({
      ...this.state,
      tasks: taskToDeleteFromState
    });
    axios.get(
      `${process.env.REACT_APP_API_URL}/api/taskRoutes/deleteTask/${taskToDelete._id}`
    );
  }

  render() {
    return (
      <div className="tasks">
        <section className="project-info">
          <div className="project-info-image">
            <img src={this.state.projectimage} alt="project" />
          </div>
          <div className="project-info-info">
            <h2>Project name: {this.state.projectname}</h2>
            <h3>Band name: {this.state.bandname}</h3>
            <div className="project-info-comments">
            <p>Comments: {this.state.comments}</p>
            </div>
          </div>
        </section>

        <section className="add-new-task">
          <input
            type="text"
            value={this.state.newTask}
            onChange={e => this.setNewTaskValue(e)}
            placeholder="Add your new task..."
          ></input>
          <button onClick={() => this.addNewTask()}>Add new task</button>
        </section>

        {this.state.tasks.filter(task => !task.done).length > 0 && (
          <div className="task-list">
            <h3 className="task-list-column">
              To do - {this.state.tasks.filter(task => !task.done).length}
            </h3>
            <section className="task-list-column">
              {this.state.tasks
                .filter(task => !task.done)
                .map(task => {
                  return (
                    <Task
                      key={task._id}
                      task={task}
                      updateTaskValue={task => this.updateTaskValue(task)}
                      deleteTask={task => this.deleteTask(task)}
                    ></Task>
                  );
                })}
            </section>
          </div>
        )}

        {this.state.tasks.filter(task => task.done).length > 0 && (
          <div className="task-list">
            <h3 className="task-list-column">
              Done - {this.state.tasks.filter(task => task.done).length}
            </h3>
            <section className="task-list-column">
              {this.state.tasks
                .filter(task => task.done)
                .map(task => {
                  return (
                    <Task
                      key={task._id}
                      task={task}
                      updateTaskValue={task => this.updateTaskValue(task)}
                      deleteTask={task => this.deleteTask(task)}
                    ></Task>
                  );
                })}
            </section>
          </div>
        )}

        {this.state.tasks.filter(task => task.done).length === 0 && (
          <h1>No tasks done</h1>
        )}
        <div>
          <Link to={`/viewprojects/${this.props.selectedStudio}`}>
            <button className="button-back">Back to projects</button>
          </Link>
        </div>
      </div>
    );
  }
}
