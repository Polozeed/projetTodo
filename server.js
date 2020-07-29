//Définition des modules
var Todo = require("../code/schema/schemaTodo");
var cron = require('node-cron');
var lib = require('../code/controller/todo/lib');
const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

//Connexion à la base de donnée
mongoose
    .connect("mongodb://localhost/user",{ useNewUrlParser: true,
        useUnifiedTopology: true  })
    .then(() => {
        console.log("Connected to mongoDB User");
    })
    .catch((e) => {
        console.log("Error while DB connecting");
        console.log(e);
    });

mongoose
    .connect("mongodb://localhost/todo",{ useNewUrlParser: true,
        useUnifiedTopology: true  })
    .then(() => {
        console.log("Connected to mongoDB TODO");
    })
    .catch((e) => {
        console.log("Error while DB connecting");
        console.log(e);
    });

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// supprime les TODOS check a heure fix : 4HOO tous les jours
cron.schedule("00 04 * * *", function() {
    console.log("---------------------");
    console.log("Running Cron Job");
    try {
        lib.deleteAllTodos();
    } catch (e) {
        console.log(e);
    }

});

//Définition du routeur
const router = express.Router();
app.use("/user", router);
require(__dirname + "/controller/userController")(router);
app.use("/todo", router);
require(__dirname + "/controller/toController")(router);
app.use("/index", router);


//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));