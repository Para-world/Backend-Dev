const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/mongodbpractice`);

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    Age: Number,
    address: String
});


module.exports = mongoose.model("user", userSchema);
