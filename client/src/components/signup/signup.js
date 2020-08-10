import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import "./styles.css";
import apsideLogo from "../../img/logo-apside.png";
import image from "../../img/signup.svg";

export class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        cpassword: ""
    };
    send = async () => {
        console.log("je suis ici ");
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
                <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
                <nav className="navbar">
                    <h1 id ='title'>Focus</h1>
                </nav>

                <h1 id="productif" className="title">Aujourd'hui, Soyez productif !</h1>
                <div >
                    <img id="imageCo" src={image}  alt=""/>
                </div>


                <div id="divSignup">
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Utilisateur</ControlLabel>
                    <FormControl className="inputText"
                        autoFocus
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Mot de passe</ControlLabel>
                    <FormControl className="inputText"
                        value={password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>

                <FormGroup controlId="cpassword" bsSize="large">
                    <ControlLabel>Confirmer Mot de passe</ControlLabel>
                    <FormControl className="inputText"
                        value={cpassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <br/>

                <Button id="inscription" onClick={this.send} block bsSize="large" type="submit">
                    Inscription
                </Button>
                </div>

                <footer className="page-footer font-small blue">
                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                        <a id="lien" href="https://apside.com/"> Apside TOP</a>
                        <img id="logoApside" src={apsideLogo} alt=""/>
                    </div>
                </footer>
            </div>
        );
    }
}