


var express = require('express');
var hostname = 'localhost';
var port = 3000;
var app = express();

var myRouter = express.Router();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


myRouter.route('/piscines')

// Crud sur route : /piscines
// GET
    .get(function(req,res){
        res.json({
            message : "Liste les piscines de Lille Métropole avec paramètres :",
            ville : req.query.ville,
            nbResultat : req.query.maxresultat,
            methode : req.method });

    })

    //POST
    .post(function(req,res) {
        res.json({
            message: "Ajoute une nouvelle piscine à la liste",
            nom: req.body.nom,
            ville: req.body.ville
        });
    })

    //PUT
    .put(function(req,res){
        res.json({message : "Mise à jour des informations d'une piscine dans la liste", methode : req.method});
    })

    //DELETE
    .delete(function(req,res){
        res.json({message : "Suppression d'une piscine dans la liste", methode : req.method});
    });


// Lancement du programme
app.use(myRouter);
app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
