var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var lib = require('./todo/lib.js');
var index = require('./index/lib.js');
var Todo = require("../schema/schemaTodo.js");

module.exports = function (app) {

    app.use(session({secret: 'todotopsecret'}))

    /* S'il n'y a pas de todolist dans la session,
    on en crée une vide sous forme d'array avant la suite */

    app.use(function (req, res, next) {
        if (typeof (req.session.todolist) == 'undefined') {
            req.session.todolist = [];
        }
        next();
    })

    /* On affiche la todolist et le formulaire */
    app.get('/index', function (req, res) {
            index.index(req,res);
    })

    /* On ajoute un élément à la todolist */
    app.post('/add', urlencodedParser, function (req, res) {
         lib.addTodo(req.body,res);
         console.log("API => ADD");
    })

    /* Afficher tous les Todo*/
    app.get('/todos/', urlencodedParser, function (req, res) {
        lib.allTodos(req.params.id, res);
    })

    /* Rechercher les Todos en fonction du User */
    app.get('/todos/:id', urlencodedParser, function (req, res) {
        lib.todosWithUser(req.params.id, res);
    })

    /* Supprime un élément de la todolist */
    app.get('/delete/:id', function (req, res) {
            console.log("API => Delete ");
            lib.deleteTodoWithId(req.params.id,res);
    })

    /* Modifie un élément de la todolist */
    app.put('/check/true/:id', function (req, res) {
        console.log("PUT Check True => " + req.body);
        lib.putCheckToTrue(req.params.id,req.body.newtodo,res);
    })

    app.put('/check/false/:id', function (req, res) {
        console.log("PUT Check False => " + req.body);
        lib.putCheckToFalse(req.params.id,req.body.newtodo,res);
    })

}

