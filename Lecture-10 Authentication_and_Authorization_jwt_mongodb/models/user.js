const mongoose = require('mongoose');

// Get MongoDB URI from environment variables or use default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/authapp';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const userSchema =  mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number

});

module.exports = mongoose.model('User', userSchema);