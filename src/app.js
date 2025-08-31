// This file sets up the server, connects to the MariaDB database, and handles API requests.

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mariadb = require('./db/mariadb');
const apiRoutes = require('./api/index');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mariadb.connect();

// Log middleware
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
    fs.appendFileSync('access.log', logEntry);
    next();
});

// API routes
app.use('/api', apiRoutes);

// Rutas frontend
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
app.get('/dashboard', (req, res) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        res.sendFile(path.join(__dirname, 'public/dashboard.html'));
    } else {
        res.redirect('/login');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});