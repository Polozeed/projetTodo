const mongoose = require("mongoose");

var todoSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        todo: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        }
    },
);
todoSchema.methods = {
    authenticate: function(password) {
        return passwordHash.verify(password, this.password);
    },
    getUser: function() {
        return todoSchema.User;
    }
};
module.exports = mongoose.model("todos", todoSchema);