import axios from 'axios';
import React, { Component } from 'react';
import {default as ReactDOM, render} from 'react-dom';
import "./styles.css";
import apsideLogo from "../../img/logo-apside.png"

import API from "../../utils/API";
import image from "../../img/plus.png";
var uuid = require('uuid');


export class Todos extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React',
            id : uuid.v4(),
            todo : "",
            user : "",
            check : false,
            newCheck : false,
            posts : [],
            s :"line-through"
        };
    }

    refreshPage() {
        window.location.reload(false);
    }

    componentWillMount() {
        todosAPI.all().then(posts => {
            console.log(posts);
            this.setState({posts});
        });
    };

    onChangeId= (event) => {
        this.setState({id: event.target.value});
    };

    onChangeTodo  = (event) => {
        this.setState({ todo: event.target.value});
    };

    onChangeUser  = (event) => {
        this.setState({user: event.target.value});
    };

    onChangeCheck(e, id, check) {
        if (check){
            axios.put(
                `http://localhost:8800/todo/check/false/` +id  );
            this.setState({s: 'none'})
        } else {
            axios.put(
                `http://localhost:8800/todo/check/true/` +id  );
            this.setState({s: 'line-through'})
        }
        this.onChangeCSSStrike(check);
        this.refreshPage();
    }

    onChangeCSSStrike(check) {
        if (check){
            return 'line-through';
        } else {
            return 'none';
        }
    }

    onChangeNewCheck  = (event) => {
        this.setState({ newCheck: event.target.checked});
    }


    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: uuid.v4(),
            todo: this.state.todo,
            user: localStorage.getItem("user"),
            check : this.state.newCheck
        };
        axios.post('http://localhost:8800/todo/add',data,{
            headers: {
                'Content-Type': 'application/json'
            }})
            .catch(err => {
                console.log(err);
            })
        this.refreshPage();
    };

    render() {
        const { posts } = this.state;
        return (
            <div id="divTodos">
                <div id ="divTest">
                    <h2>Mes Taches</h2>
                <ul class="list-group">
                    { posts.map(p => (
                        <il class="list-group-item" active key={p._id}>
                            <label className="custom-checkbox">
                                <input className="testtaille" type="checkbox" onClick={ e => this.onChangeCheck(e ,p.id, p.check)}
                                       href="" checked={ p.check}/>
                                <i className="fa  fa-circle-o unchecked"></i>
                                <i className="fa fa-check-circle-o checked"></i>
                            </label>

                            <a onClick={e => todosAPI.deleteTodo(e, p.id)}  href="" id="test">
                                <img src="https://img.icons8.com/officexs/16/000000/delete-sign.png"/>
                            </a>
                            <span style= {{ 'text-decoration': this.onChangeCSSStrike(p.check)}}> { p.todo } </span>


                        </il >
                    )) }
                </ul>
                </div>
                <br/>
                <br/>
                <form id="formadd" onSubmit={this.handleSubmit} >
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <img id="imagePlus" src={image}  alt=""/>
                        <input id="textadd" className="todoadd" type="text" value={this.state.todo} name="todo" onChange={ this.onChangeTodo} placeholder="Ajouter une tache"/>
                        <input id="boutonadd" type="submit"/>
                </form>
            </div>
        );
    }
}

let todosAPI;

todosAPI = {
    posts: [],

    all: function () {
        return axios.get('http://localhost:8800/todo/todos/'+ localStorage.getItem("user"))
            .then(res => {
                this.posts = res.data;
                return this.posts;
            })
    },

    deleteTodo : function(e, _id) {
        axios.get('http://localhost:8800/todo/delete/'+_id, {
            headers: {
                'Content-Type': 'application/json'
            }})
            .catch(err => {
                console.log(err);
            })
    }
};


ReactDOM.render(<newtodo />, document.getElementById('root'));
render(<Todos />, document.getElementById('root'));

