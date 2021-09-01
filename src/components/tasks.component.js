import React, { Component } from "react";

import UserService from "../services/user.service";
import NewTask from "./new.component";
import Check from "./check.component";

export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            tasks: [],
            newTask: false
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        this.updateTasks();
        this.updateTimer = setInterval(() => this.updateTasks(), 30000);
    }

    componentWillUnmount(){
        clearInterval(this.updateTimer);
    }

    updateTasks(){
        UserService.getTasks().then(
            response => {
                this.setState({
                    tasks: response.data
                })
            },
            error => {
                this.setState({
                    tasks: []
                })
            }
        );
    }

    handleDelete(taskID){
        UserService.deleteTask(taskID).then(response => this.updateTasks())
    }

    completeTask(taskID){
        console.log(taskID)
        UserService.completeTask(taskID).then(response => this.updateTasks())
    }

    renderTasks(){
        return this.state.tasks.map((task) => {
            const { desc, id, name, lastTime, frequency} = task
            return(
                <tr key={id}>
                    <th scope={"row"}>{id}</th>
                    <td>{name}</td>
                    <td>{desc}</td>
                    <td>{lastTime}</td>
                    <td>{frequency ? frequency.substr(2) : 0}</td>
                    <td>
                        <Check completeTaskCall={this.completeTask.bind(this)} taskID={id}/>
                        <button className="btn  btn-primary" onClick={() => this.handleDelete(id)}>Delete</button>
                    </td>
                </tr>
            )
        });
    }

    newTaskToggle(){
        this.state.newTask ? this.setState({newTask: false}) : this.setState({newTask: true})
        this.updateTasks()
    }

    render() {
        return (
            <div className="container">
                <div className="container">
                    <header>
                        <h3>Task List</h3>
                    </header>
                    {this.state.newTask ?
                        <div>
                            <button className="btn btn-light" onClick={() => this.newTaskToggle()}>Cancel</button>
                            <NewTask newTaskCall={this.newTaskToggle.bind(this)}/>
                        </div> :
                        <button className="btn btn-light" onClick={() => this.newTaskToggle()}>New Task</button>
                    }
                </div>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope={"col"}>id</th>
                        <th scope={"col"}>name</th>
                        <th scope={"col"}>description</th>
                        <th scope={"col"}>last time</th>
                        <th scope={"col"}>frequency</th>
                        <th scope={"col"}>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTasks()}
                    </tbody>
                </table>
            </div>
        );
    }
}