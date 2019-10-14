import React, { Component } from "react";
import Task from './Task'
import axios from "axios";
import { Link } from "react-router-dom"
import './ViewTasks.css'
export default class ViewTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: ""
    };
  }

  componentDidMount() {
    // axios.get(`http://localhost:3001/api/taskRoutes/allTasks/`).then(tasksFromBackend => {
    //   // console.log(tasksFromBackend.data._id)
    //   this.setState({
    //     ...this.state,
    //     tasks: tasksFromBackend.data
    //   });
    // });

    axios.get(`${process.env.REACT_APP_API_URL}/api/taskRoutes/projectTasks/${this.props.match.params.id}`)
    .then(tasksFromBackend => {
      console.log(tasksFromBackend.data)
      this.setState({
        ...this.state,
        tasks: tasksFromBackend.data.tasks
      });
    });
  }

  addNewTask() {
    if (this.state.newTask === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/taskRoutes/newTask`, { name: this.state.newTask, projectID: this.props.match.params.id })
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
    let taskToUpdateFromState = tasks.find(task => task._id === taskToUpdate._id);
    let newDoneState = !taskToUpdateFromState.done

    let URL = `${process.env.REACT_APP_API_URL}/api/taskRoutes/task/${taskToUpdate._id}/done/${newDoneState}/project/${this.props.match.params.id}`

    // console.log(URL)
    axios
      .get(
        URL
      )
      .then(allTasks => {
        // this re-updates the state with updated object, hence updating the checkbox
        this.setState({
          ...this.state,
          tasks: allTasks.data.tasks
        });
      });
  }
  render() {
    return (
      <div className="tasks">
        <header>
          <input
            type="text"
            value={this.state.newTask}
            onChange={e => this.setNewTaskValue(e)}
            placeholder="Please specify your new task"
          ></input>
          <button onClick={() => this.addNewTask()}>Add new task</button>
        </header>
        {this.state.tasks.filter(task => !task.done).length > 0 && (
          <div>
            <h1 className="task-list">
              Total tasks to do -{" "}
              {this.state.tasks.filter(task => !task.done).length}
            </h1>
            <section className="task-list" >
              {this.state.tasks
                .filter(task => !task.done)
                .map(task => {
                  return (
                    <Task
                      key={task._id}
                      task={task}
                      updateTaskValue={task => this.updateTaskValue(task)}
                    ></Task>
                  );
                })}
            </section>
          </div>
        )}

        {this.state.tasks.filter(task => task.done).length > 0 && (
          <div>
            <h1 className="task-list">
              Total tasks done -{" "}
              {this.state.tasks.filter(task => task.done).length}
            </h1>
            <section className="task-list">
              {this.state.tasks
                .filter(task => task.done)
                .map(task => {
                  return (
                    <Task
                      key={task._id}
                      task={task}
                      updateTaskValue={task => this.updateTaskValue(task)}
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
          <Link to={`/viewprojects/${this.props.match.params.id}`}>Back to projects</Link>
        </div>
      </div>
      // <h1>hola</h1>
    );
  }
}
