const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    password: String,
    avatar: String,
    email: String
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;