const mongoose = require('mongoose');
mongoose.connect("mongodb://users:users@ds263989.mlab.com:63989/nickiscool")

//creating a test schema
const userSchema = mongoose.Schema({
    username:String,
    password: String,
    alias: String
});

//creating a model using schema
const userModel = mongoose.model('users', userSchema);

//making avalible for node application
module.exports = userModel;