import React, { Component } from "react";

import UserService from "../services/user.service";

export default class NewTask extends Component{

    constructor(props, context) {
        super(props, context);
        this.handleNewTask = this.handleNewTask.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeFrequency = this.onChangeFrequency.bind(this)

        this.state = {
            name: "",
            desc: "",
            frequency: 0
        }
    }

    onChangeName(e){
        this.setState({name: e.target.value})
    }

    onChangeDesc(e){
        this.setState({desc: e.target.value})
    }

    onChangeFrequency(e){
        this.setState({frequency: Number(e.target.value)})
        console.log(this.state.frequency)
        console.log(this.state.frequency.type)
    }

    handleNewTask(e){
        e.preventDefault();
        UserService.addTask(this.state).then(response => this.props.newTaskCall())
    }

    render() {
        return (
            <div className="card card-container bg-dark">
                <h3>Create a New Task</h3>
                <form
                    onSubmit={this.handleNewTask}
                    ref={c => {this.form = c;}}
                >
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Task Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Task Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.desc}
                                onChange={this.onChangeDesc}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="frequency">Frequency (in hours)</label>
                            <input
                                type="number"
                                className="form-control"
                                min={0}
                                value={this.state.frequency}
                                onChange={this.onChangeFrequency}
                                />
                        </div>
                        <input className={"btn btn-primary"} type="submit" value="submit"/>

                        {/*<div className="form-group">*/}
                        {/*    <button className="btn btn-primary btn-block">Submit Task</button>*/}
                        {/*</div>*/}
                    </div>
                </form>
            </div>
        )
    }
}