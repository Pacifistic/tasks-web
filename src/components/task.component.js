import React, { Component } from "react";
import Check from "./check.component";
import UserService from "../services/user.service";

export default class Task extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            desc: this.props.desc,
            lastTime: this.props.lastTime ? new Date(this.props.lastTime) : null,
            frequency: Number(this.props.frequency.substr(2,this.props.frequency.length-3)),
            nextTime: null,
            isTime:false
        }
    }

    componentDidMount() {
        this.getNextTime()
    }

    completeTask(taskID){
        UserService.completeTask(taskID).then(response => {
            this.setState({lastTime: new Date(response.data)})
            this.props.updateTasks()
        })
    }

    handleDelete(taskID){
        UserService.deleteTask(taskID).then(response => this.props.updateTasks())
    }

    getNextTime(){
        if(this.state.lastTime === null || this.state.frequency === 0) {
            this.setState({nextTime: null})
            return
        }
        let next = this.state.lastTime
        next.setTime(next.getTime() + (this.state.frequency * 3600 * 1000))
        this.setState({nextTime: next},() => this.isTime())
    }

    isTime(){
        let now = new Date()
        if(this.state.nextTime === null || this.state.frequency === 0) {
            this.setState({isTime: false})
        }
        else {
            let diff = (this.state.nextTime.getTime() - now.getTime()) < 0
            this.setState({isTime: diff})
        }
    }

    getFrequencyReadable(){
        const {frequency} = this.state
        if(frequency >= 24)
            return frequency/24 + " days"
        else
            return frequency + " hours"
    }

    render() {
        const {id, name, desc, lastTime, isTime} = this.state
        return (
            <tr key={id} className={(isTime ? "table table-primary" : "")}>
                <th scope={"row"}>{id}</th>
                <td>{name}</td>
                <td style={{maxWidth: '300px', wordWrap:"break-word"}}>{desc}</td>
                <td>{lastTime ? lastTime.toString() : ""}</td>
                <td>{this.getFrequencyReadable()}</td>
                <td>
                    <Check completeTaskCall={this.completeTask.bind(this)} taskID={id}/>
                    <button className="btn btn-primary" onClick={() => this.handleDelete(id)}>Delete</button>
                </td>
            </tr>
        )
    }
}