const mongoose = require('mongoose');
mongoose.connect("mongodb://users:users@ds113870.mlab.com:13870/nickiscool")

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