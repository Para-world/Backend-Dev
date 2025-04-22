// Load environment variables
require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');

// Import authentication middleware
const { isAuthenticated } = require('./middleware/auth');

// Environment variables
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';
const SESSION_SECRET = process.env.SESSION_SECRET || 'another-secret-key-for-sessions';

// Rate limiting for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many login attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Setup middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Session and flash messages setup
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(flash());

// CSRF protection
app.use(csrf({ cookie: true }));

// Pass flash messages and CSRF token to all views
app.use((req, res, next) => {
    res.locals.messages = {
        success: req.flash('success'),
        error: req.flash('error')
    };
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Error handler for CSRF errors
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        req.flash('error', 'Invalid form submission, please try again');
        return res.redirect('back');
    }
    next(err);
});

// Home/Register page
app.get('/', (req, res) => {
    // If user is already logged in, redirect to dashboard
    if (req.cookies.token) {
        return res.redirect('/dashboard');
    }
    res.render('index');
});

// Login page
app.get('/login', (req, res) => {
    // If user is already logged in, redirect to dashboard
    if (req.cookies.token) {
        return res.redirect('/dashboard');
    }
    res.render('login');
});

// Dashboard page (protected route)
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

// Edit profile page (protected route)
app.get('/edit-profile', isAuthenticated, (req, res) => {
    res.render('edit-profile', { user: req.user });
});

// User registration
app.post('/create', async (req, res) => {
    try {
        let { username, email, password, age } = req.body;

        // Validate input
        if (!username || !email || !password || !age) {
            req.flash('error', 'All fields are required');
            return res.redirect('/');
        }

        if (password.length < 6) {
            req.flash('error', 'Password must be at least 6 characters');
            return res.redirect('/');
        }

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            req.flash('error', 'Email already in use');
            return res.redirect('/');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create user
        let createUser = await userModel.create({
            username,
            email,
            password: hash,
            age
        });

        // Generate JWT token
        const token = jwt.sign({ id: createUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

        // Set success message and redirect
        req.flash('success', 'Account created successfully!');
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error creating user:', error);
        req.flash('error', 'Error creating account. Please try again.');
        res.redirect('/');
    }
});

// User login with rate limiting
app.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            req.flash('error', 'Email and password are required');
            return res.redirect('/login');
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

        // Set success message and redirect
        req.flash('success', 'Logged in successfully!');
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'Error during login. Please try again.');
        res.redirect('/login');
    }
});

// Update profile
app.post('/update-profile', isAuthenticated, async (req, res) => {
    try {
        const { username, email, age } = req.body;

        // Validate input
        if (!username || !email || !age) {
            req.flash('error', 'All fields are required');
            return res.redirect('/edit-profile');
        }

        // Check if email is already in use by another user
        if (email !== req.user.email) {
            const existingUser = await userModel.findOne({ email, _id: { $ne: req.user._id } });
            if (existingUser) {
                req.flash('error', 'Email already in use');
                return res.redirect('/edit-profile');
            }
        }

        // Update user
        await userModel.findByIdAndUpdate(req.user._id, {
            username,
            email,
            age
        });

        req.flash('success', 'Profile updated successfully!');
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Update profile error:', error);
        req.flash('error', 'Error updating profile. Please try again.');
        res.redirect('/edit-profile');
    }
});

// Change password
app.post('/change-password', isAuthenticated, async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword || !confirmPassword) {
            req.flash('error', 'All fields are required');
            return res.redirect('/edit-profile');
        }

        if (newPassword !== confirmPassword) {
            req.flash('error', 'New passwords do not match');
            return res.redirect('/edit-profile');
        }

        if (newPassword.length < 6) {
            req.flash('error', 'New password must be at least 6 characters');
            return res.redirect('/edit-profile');
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, req.user.password);
        if (!isMatch) {
            req.flash('error', 'Current password is incorrect');
            return res.redirect('/edit-profile');
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Update password
        await userModel.findByIdAndUpdate(req.user._id, { password: hash });

        req.flash('success', 'Password changed successfully!');
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Change password error:', error);
        req.flash('error', 'Error changing password. Please try again.');
        res.redirect('/edit-profile');
    }
});

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'Logged out successfully');
    res.redirect('/login');
});

// Error handling middleware
app.use((_, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});

app.use((err, _, res, __) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});