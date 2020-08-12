import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";
import {Todos} from "../todos/todos";
import {All} from "../Countdown/countdown";
import style from "./style.css"
import apsideLogo from "../../img/logo-apside.png";

export class Dashboard extends React.Component {
    disconnect = () => {
        API.logout();
        window.location = "/";
    };
    render() {
        return (
            <div className="Dashboard" id="dash">
                <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
                <nav className="navbar">
                    <div className="container">
                        <h1 id ='title'>FOCUS</h1>
                        <div id ="logOut">
                        <img  src="https://img.icons8.com/windows/32/000000/exit.png" onClick={this.disconnect}/>
                        </div>
                    </div>
                </nav>
                <div id="cercle">
                </div>
                <Todos>
                </Todos>
            <All>
            </All>
                <footer id="footer" className="page-footer font-small blue">
                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                        <a id="lien" href="https://apside.com/"> Apside TOP</a>
                        <img id="logoApside" src={apsideLogo} alt=""/>
                    </div>
                </footer>
            </div>
        );
    }
}