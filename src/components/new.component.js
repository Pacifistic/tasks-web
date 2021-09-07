import React, { Component } from "react";

import UserService from "../services/user.service";

export default class NewTask extends Component{

    constructor(props, context) {
        super(props, context);
        this.handleNewTask = this.handleNewTask.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeFrequency = this.onChangeFrequency.bind(this)
        this.onChangeType = this.onChangeType.bind(this)

        this.state = {
            name: "",
            desc: "",
            frequency: 0,
            freqType: "hours"
        }
    }

    onChangeName(e){
        this.setState({name: e.target.value})
    }

    onChangeDesc(e){
        this.setState({desc: e.target.value})
    }

    onChangeFrequency(e){
        let f = Number(e.target.value)
        switch(this.state.freqType){
            case "hours":
                this.setState({frequency: f})
                break
            case "days":
                this.setState({frequency: f*24})
                break
            case "weeks":
                this.setState({frequency: f*24*7})
                break
            default:
                break
        }
    }
    onChangeType(e){
        this.setState({freqType: e.target.value})
    }

    handleNewTask(e){
        e.preventDefault();
        UserService.addTask(this.state).then(() => this.props.newTaskCall())
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
                        <div className="col-md-12">
                            <label htmlFor="name">Task Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="desc">Task Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.desc}
                                onChange={this.onChangeDesc}
                                />
                        </div>
                        <div className="row g-0">
                            <label htmlFor="frequency">Frequency</label>
                            <div className="col-md-7">

                                <input
                                    type="number"
                                    className="form-control col"
                                    min={0}
                                    // value={this.state.frequency}
                                    onChange={this.onChangeFrequency}
                                    />
                            </div>
                            <div className={"col-md-5"}>
                                <select className={"form-select col"} style={{marginBottom:10}} onChange={this.onChangeType}>
                                    <option value={"hours"}>hours</option>
                                    <option value={"days"}>days</option>
                                    <option value={"weeks"}>weeks</option>
                                </select>
                            </div>
                        </div>
                        <input className={"btn btn-primary"} type="submit" value="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}