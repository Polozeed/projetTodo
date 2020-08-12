import axios from "axios";
const headers = {
    "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
    login: function(email, password,text) {
        return axios.post(
            `${burl}/user/login`,
            {
                email,
                password,
                text
            },
            {
                headers: headers
            }
        );
    },
    signup: function(send) {
        return axios.post(`${burl}/user/signup`, send, { headers: headers });
    },

    isAuth: function() {
        return localStorage.getItem("token") !== null;
    },
    logout: function() {
        localStorage.clear();
    },

    todo: function() {
        window.location = "http://localhost:8800/todo/index";
    },

    signupLocation: function() {
        window.location = "http://localhost:3000/signup";
    },
};