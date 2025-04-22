# Authentication and Authorization System

A complete user authentication and authorization system built with Node.js, Express, MongoDB, and JWT. This application provides secure user registration, login, profile management, and protected routes.

![Authentication System](https://via.placeholder.com/800x400?text=Authentication+System)

## Features

- **User Registration**: Create new accounts with username, email, password, and age
- **User Authentication**: Secure login with JWT tokens
- **Profile Management**: View and update user profile information
- **Password Management**: Change password with current password verification
- **Security Features**: CSRF protection, rate limiting, password hashing
- **Responsive UI**: Modern interface built with Tailwind CSS

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server-side application
- **Express.js**: Web framework for handling HTTP requests and routing
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB

### Frontend
- **EJS**: Templating engine for generating HTML with JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling

### Authentication & Security
- **JWT (JSON Web Tokens)**: For secure authentication
- **Bcrypt**: For password hashing
- **Cookie-Parser**: For handling cookies
- **CSRF Protection**: To prevent cross-site request forgery attacks
- **Rate Limiting**: To prevent brute force attacks

## Packages Used

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.1.0 | Web framework for Node.js |
| mongoose | ^8.13.2 | MongoDB object modeling |
| bcrypt | ^5.1.1 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT implementation |
| cookie-parser | ^1.4.7 | Parse Cookie header and populate req.cookies |
| ejs | ^3.1.10 | Templating engine |
| dotenv | latest | Load environment variables |
| express-session | latest | Session middleware |
| connect-flash | latest | Flash messages |
| csurf | latest | CSRF protection middleware |
| express-rate-limit | latest | Rate limiting middleware |

### Why These Packages?

- **express**: The most popular Node.js framework that provides robust features for web applications.
- **mongoose**: Simplifies MongoDB operations with schema validation and middleware support.
- **bcrypt**: Industry-standard for secure password hashing with salt rounds.
- **jsonwebtoken**: Implements JWT standard for secure information transmission.
- **cookie-parser**: Essential for handling JWT tokens stored in cookies.
- **ejs**: Simple templating engine that works well with Express.
- **dotenv**: Keeps sensitive information like database credentials and JWT secrets secure.
- **express-session**: Required for flash messages and maintaining user sessions.
- **connect-flash**: Provides temporary messages for user feedback.
- **csurf**: Protects against CSRF attacks by requiring a token for form submissions.
- **express-rate-limit**: Prevents brute force attacks by limiting login attempts.

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Lecture-10 Authentication_and_Authorization_jwt_mongodb
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/authapp
JWT_SECRET=your-super-secret-key-change-in-production
SESSION_SECRET=another-secret-key-for-sessions
```

4. Start MongoDB
```bash
# If using MongoDB locally
mongod
```

5. Start the application
```bash
node app.js
```

6. Open your browser and navigate to `http://localhost:3000`

## User Testing Guide

### Registration
1. Navigate to the homepage (`http://localhost:3000`)
2. Fill in the registration form with:
   - Username (at least 3 characters)
   - Email (valid format)
   - Password (at least 6 characters)
   - Age (between 1-120)
3. Click "Create Account"
4. You should be redirected to the dashboard upon successful registration

### Login
1. Navigate to the login page (`http://localhost:3000/login`)
2. Enter your email and password
3. Click "Login"
4. You should be redirected to the dashboard upon successful login

### View Dashboard
1. After logging in, you'll be taken to the dashboard
2. The dashboard displays your profile information:
   - Username
   - Email
   - Age
   - Account creation date

### Edit Profile
1. From the dashboard, click "Edit Profile"
2. Update your information:
   - Username
   - Email
   - Age
3. Click "Update Profile"
4. You should see a success message and be redirected to the dashboard with updated information

### Change Password
1. From the Edit Profile page, scroll down to the "Change Password" section
2. Enter:
   - Current Password
   - New Password (at least 6 characters)
   - Confirm New Password
3. Click "Change Password"
4. You should see a success message upon successful password change

### Logout
1. Click "Logout" in the top-right corner of the dashboard
2. You should be redirected to the login page

## Security Features

### CSRF Protection
All forms include a hidden CSRF token that must be validated for the form submission to be accepted.

### Rate Limiting
Login attempts are limited to 5 per 15 minutes to prevent brute force attacks.

### Password Security
Passwords are hashed using bcrypt with salt rounds for maximum security.

### HTTP-Only Cookies
JWT tokens are stored in HTTP-only cookies to prevent JavaScript access.

### Input Validation
All user inputs are validated both on the client-side and server-side.

## Error Handling

The application provides clear error messages for various scenarios:
- Invalid login credentials
- Registration with an existing email
- Form validation errors
- Session expiration
- Server errors

## Development Notes

### Environment Variables
- `PORT`: The port the server runs on (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation and verification
- `SESSION_SECRET`: Secret key for session management

### Project Structure
```
├── middleware/       # Authentication middleware
├── models/           # Database models
├── public/           # Static assets
├── views/            # EJS templates
├── .env              # Environment variables
├── app.js            # Main application file
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Future Enhancements

- Email verification for new accounts
- Password reset functionality
- OAuth integration (Google, Facebook, etc.)
- User roles and permissions
- Two-factor authentication
- Account deletion
- Activity logging

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)
