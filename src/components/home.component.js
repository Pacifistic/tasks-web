import React, { Component } from "react";

export default class Home extends Component {

    render() {
        return (
            <div className="container text-center">
                <header className="jumbotron">
                    <h1>Welcome to the repeated tasks reminder</h1>
                    <h3>Created by Dominykas Sipelis</h3>
                </header>
                <p style={{marginBottom: 100, marginTop:50}}>This site is intended for use as a reminder app for repeated tasks. Use it to remind yourself about
                medicine you need to take, daily tasks around the house, or monthly tasks that you need to finish.</p>

                <table className={"table table-dark"}>
                    <tbody>
                    <tr>
                    <th width={"50%"}>
                        <img
                            src="https://repeated-tasks-web.s3.us-east-2.amazonaws.com/Programming-Coding-Icon.png"
                            alt={""}
                            height={256}
                            />
                        <p>
                            This site was made using a spring boot backend and a react frontend all deployed on AWS.
                        </p>
                    </th>
                    <th width={"50%"}>
                        <a href="https://github.com/dsipelis" target="_blank" rel="noreferrer noopener">
                        <img
                            src="https://repeated-tasks-web.s3.us-east-2.amazonaws.com/GitHub-Mark.png"
                            alt="github logo"
                            height={256}
                            />
                        </a>
                        <p>
                            My github page with the repositories for the front and back end for this site.
                        </p>
                    </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}