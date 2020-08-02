const mongoose = require("mongoose");

var todoSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required:false
        },
        todo: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        check: {
            type: Boolean,
            required: false
        },
        s: {
            type: Boolean,
            required: false
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