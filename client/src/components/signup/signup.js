import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import "./styles.css";

export class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        cpassword: ""
    };
    send = async () => {
        const { email, password, cpassword } = this.state;
        if (!email || email.length === 0) return;
        if (!password || password.length === 0 || password !== cpassword) return;
        try {
            const { data } = await API.signup({ email, password });
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
        const { email, password, cpassword } = this.state;
        return (
            <div className="Login">
                <img id="image" src="https://www.frenchtechbordeaux.com/wp-content/uploads/2019/01/Apside.png" width="150" height="50" alt=""/>

                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Utilisateur</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Mot de passe</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="cpassword" bsSize="large">
                    <ControlLabel>Confirmer Mot de passe</ControlLabel>
                    <FormControl
                        value={cpassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <br/>
                <br/>

                <Button id="inscription" onClick={this.send} block bsSize="large" type="submit">
                    Inscription
                </Button>
            </div>
        );
    }
}