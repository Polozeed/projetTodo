var Todo = require("../../schema/schemaTodo.js");

var allTodos = function(req,res){
    Todo.find({user : req}, function(err, todos){
    if(err) res.send(err);
    res.json(todos);
    })
}

var allTodos2 = function(req,res){
    Todo.find({}, function(err, todos){
        if(err) res.send(err);
        res.json(todos);
    })
}

var todosWithUser = function(req,res){
    Todo.find({user : req}, function(err, todos) {
        if (err) res.send(err);
        res.json(todos);
    })
}

var deleteTodoWithId = function (req, res) {
    Todo.findOneAndDelete({id: req}, function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
    })
}

var putTodoWCithId = function (req, body, res) {
    console.log(body);
    const options = { "returnNewDocument": false };
    const replacement = {
        "id": "blocks",
        "todo": "test 2",
        "user": "toys",
        "check" : "false"
    };
    const data = body;
    Todo.findOneAndReplace({id: req}, data, options)
        .then(replacedDocument => {
        if(replacedDocument) {
            console.log(`Successfully replaced the following document: ${replacedDocument}.`)
        } else {
            console.log("No document matches the provided query.")
        }
        return res.status(200).json({
                text: "Succès",
                id : req.id
            });

    })

}

var putCheckToTrue =  async function (req, body, res) {
    // Sauvegarde de l'utilisateur en BD
    const newvalues = { $set: {check: true}};
    const todoObject = await Todo.updateOne({id: req}, newvalues);
    console.log(todoObject);
    return res.status(200).json({
        text: "Succès",
        token: todoObject
    });
}

var putCheckToFalse =  async function (req, body, res) {
    // Sauvegarde de l'utilisateur en BD
    const newvalues = { $set: {check: false}};
    const todoObject = await Todo.updateOne({id: req}, newvalues);
    console.log(todoObject);
    return res.status(200).json({
        text: "Succès",
        token: todoObject
    });
}


var addTodo =  async function (req, res) {
    try {
        // Sauvegarde de l'utilisateur en BD
        const todoData = new Todo(req);
        const todoObject = await todoData.save();
        console.log(todoObject);
        return res.status(200).json({
            text: "Succès",
            token: todoObject
        });
    } catch (error) {
        return res.status(500).json({error});
    }
}

// Supprime les Todos check
var deleteAllTodos =  async function () {
    const todoObject = await Todo.deleteMany({check: true});
    console.log(todoObject);
}


module.exports = {
    todosWithUser: todosWithUser,
    allTodos: allTodos,
    allTodos2 : allTodos2,
    deleteTodoWithId : deleteTodoWithId,
    putCheckToTrue : putCheckToTrue,
    putCheckToFalse : putCheckToFalse,
    deleteAllTodos : deleteAllTodos,
    addTodo : addTodo
}
