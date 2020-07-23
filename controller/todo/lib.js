var Todo = require("../../schema/schemaTodo.js");

var allTodos = function(req,res){
    Todo.find({user : req}, function(err, todos){
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

var addTodo =  async function (req, res) {
    try {
        // Sauvegarde de l'utilisateur en BD
        const todoData = new Todo(req);
        const todoObject = await todoData.save();
        return res.status(200).json({
            text: "Succès",
            token: todoObject
        });
    } catch (error) {
        return res.status(500).json({error});
    }
}



module.exports = {
    todosWithUser: todosWithUser,
    allTodos: allTodos,
    deleteTodoWithId : deleteTodoWithId,
    addTodo : addTodo
}
