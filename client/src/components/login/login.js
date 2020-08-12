import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import "./style.css";
import image from "../../img/login.svg"
import apsideLogo from "../../img/logo-apside.png"

export class Login extends React.Component {
    state = {
        email: "",
        password: "",
        text:" ",
    };
    send = async () => {
        const { email, password, text } = this.state;
        if (!email || email.length === 0) {
            return;
        }
        if (!password || password.length === 0) {
            return;
        }
        try {
            const { data } = await API.login(email, password);
            const rep = data.text;
            console.log(rep);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user);

            window.location = "/dashboard";
        } catch (error) {
            console.log(error.response.data.text);
            this.setState({ text: error.response.data.text});
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

            <div className="Login" id="allLogin">
                <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
                <nav className="navbar">
                        <h1 id ='title'>Focus</h1>
                </nav>
                <h1 id="productif" className="title">Aujourd'hui, Soyez productif !</h1>
                <div >
                    <img id="imageCo" src={image}  alt=""/>
                </div>
                <div id="divConnexion">
                <FormGroup controlId="email" bsSize="large" >
                    <ControlLabel>Email</ControlLabel>
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
                <br/>
                <br/>
                <Button id="connexion" onClick={this.send} block bsSize="large" type="submit">
                    Connexion
                </Button>
                <br/>
                    <span id="spanErrorCo"> { this.state.text } </span>
                <br/>
                    <h3>
                        <a className="title" href="http://localhost:3000/signup">Pas encore inscrit ?</a>
                    </h3>
                </div>
                <br/>
                <br/>
                <footer class="page-footer font-small blue">
                    <div class="footer-copyright text-center py-3">© 2020 Copyright:
                        <a id="lien" href="https://apside.com/"> Apside TOP</a>
                        <img id="logoApside" src={apsideLogo}  alt=""/>
                    </div>
                </footer>
            </div>
        );
    }
}