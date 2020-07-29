import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";
import {Todos} from "../todos/todos";
import {All} from "../Countdown/countdown";


export class Dashboard extends React.Component {
    disconnect = () => {
        API.logout();
        window.location = "/";
    };
    render() {
        return (
            <div className="Dashboard">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src="https://www.frenchtechbordeaux.com/wp-content/uploads/2019/01/Apside.png" width="150" height="50" alt=""/>
                        </a>
                        <h1 id ='test'>Todo List </h1>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                            </ul>
                            <button onClick={this.disconnect}  type="submit" className="btn btn-danger">Deconnexion</button>
                        </div>
                    </div>
                </nav>
                <br/>
                <br/>
                <Todos>
                </Todos>
            <All>
            </All>
            </div>
        );
    }
}