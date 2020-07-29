import axios from 'axios';
import React, { Component } from 'react';
import {default as ReactDOM, render} from 'react-dom';
import "./styles.css";
import API from "../../utils/API";
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
        } else {
            axios.put(
                `http://localhost:8800/todo/check/true/` +id  );
        }
        this.refreshPage();
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
            <div>
                <h1>Todo List</h1>
                <ul class="list-group">
                    { posts.map(p => (
                        <il class="list-group-item" active key={p._id}>
                            <a  onClick={e => todosAPI.deleteTodo(e, p.id)} href="" id="test"> ✘</a>
                            { p.todo }
                            { "---------> " + p.check }
                            <input type="checkbox"  onClick={ e => this.onChangeCheck(e ,p.id, p.check)}   href="" checked={ p.check}/>
                        </il >
                    )) }
                </ul>
                <br/>
                <br/>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit} >
                    <p>
                        <label className="newtodo">Ajouter TODO </label>
                        <input type="text" value={this.state.todo} name="todo" onChange={ this.onChangeTodo} />
                        <input type="checkbox" checked={this.state.newCheck} name="newCheck" onChange={ this.onChangeNewCheck}/>
                        <input type="submit"/>
                    </p>
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

