import React, { Component } from "react";

import UserService from "../services/user.service";
import NewTask from "./new.component";

export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            tasks: []
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

    renderTasks(){
        return this.state.tasks.map((task) => {
            const { desc, id, name, lastTime, frequency} = task
            console.log(frequency)
            return(
                <tr key={id}>
                    <th scope={"row"}>{id}</th>
                    <td>{name}</td>
                    <td>{desc}</td>
                    <td>{lastTime}</td>
                    <td>{frequency ? frequency.substr(2) : 0}</td>
                    <td>
                        <button className="btn btn-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-check" viewBox="0 0 16 16">
                                <path
                                    d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                            </svg>
                        </button>
                        <button className="btn  btn-primary" onClick={() => this.handleDelete(id)}>Delete</button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div className="container">
                <div className="container">
                    <header>
                        <h3>Task List</h3>
                    </header>
                    <NewTask />
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