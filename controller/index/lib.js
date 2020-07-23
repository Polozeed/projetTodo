var Todo = require("../../schema/schemaTodo.js");


var index = function(req,res){
    res.render('todo.ejs', {todolist: req.session.todolist});
}

module.exports = {
    index : index
}
