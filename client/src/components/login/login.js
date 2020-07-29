import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import {Dashboard} from "../dashboard/dashboard";
import style from "./style.css";


export class Login extends React.Component {
    state = {
        email: "",
        password: ""
    };
    send = async () => {
        const { email, password } = this.state;
        if (!email || email.length === 0) {
            return;
        }
        if (!password || password.length === 0) {
            return;
        }
        try {
            const { data } = await API.login(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user);
            window.location = "/dashboard";
        } catch (error) {
            console.error(error);
        }
    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        const { email, password } = this.state;
        return (
            <div className="Login">

                <h1> TO-DO List / Apside Top </h1>
                <br/>
                <br/>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <br/>
                <br/>
                <Button onClick={this.send} block bsSize="large" type="submit">
                    Connexion
                </Button>
                <br/>
                <br/>
                <h3>
                Tjs pas inscrit alors c'est par ici :
                </h3>
                <Button onClick={API.signupLocation} block bsSize="large" type="submit" >
                    S'inscrire
                </Button>
            </div>
        );
    }
}