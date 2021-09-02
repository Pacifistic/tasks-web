import React, { Component } from "react";

import UserService from "../services/user.service";
import NewTask from "./new.component";
import Task from "./task.component";

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

    renderTasks(){
        return this.state.tasks.map((task) => {
            return <Task key={task.id} updateTasks={this.updateTasks.bind(this)} {...task}/>
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