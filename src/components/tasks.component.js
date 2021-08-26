import React, { Component } from "react";

import UserService from "../services/user.service";

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
                    tasks:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                })
            }
        );
    }

    renderTasks(){
        return this.state.tasks.map((task) => {
            const { desc, id, name, start} = task
            return(
                <tr key={id}>
                    <th scope={"row"}>{id}</th>
                    <td>{name}</td>
                    <td>{desc}</td>
                    <td>{start}</td>
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
                </div>
                <table class="table table-dark">
                    <thead>
                    <tr>
                        <th scope={"col"}>id</th>
                        <th scope={"col"}>name</th>
                        <th scope={"col"}>description</th>
                        <th scope={"col"}>start time</th>
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