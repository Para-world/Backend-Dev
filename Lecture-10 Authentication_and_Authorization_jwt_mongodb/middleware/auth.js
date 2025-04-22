const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

// Get JWT secret from environment variables or use default
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

// Middleware to verify JWT token
const isAuthenticated = async (req, res, next) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies.token;

        if (!token) {
            req.flash('error', 'Please log in to access this page');
            return res.redirect('/login');
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find user by id
        const user = await userModel.findById(decoded.id);

        if (!user) {
            req.flash('error', 'User not found. Please log in again');
            res.clearCookie('token');
            return res.redirect('/login');
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        req.flash('error', 'Session expired. Please log in again');
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

module.exports = {
    isAuthenticated,
    JWT_SECRET
};
