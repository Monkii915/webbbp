// filepath: /modern-web-app/modern-web-app/src/api/index.js

const express = require('express');
const router = express.Router();
const mariadb = require('../db/mariadb');

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await mariadb.getUser(username, password);
        if (user) {
            req.session.user = user;
            console.log('Login exitoso:', username);
            await mariadb.logAccess(username, req.ip);
            res.json({ success: true, role: user.role });
        } else {
            console.log('Login fallido:', username);
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Dashboard (solo admin)
router.get('/dashboard', (req, res) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        res.json({ message: 'Welcome to admin dashboard!' });
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
});

// Export the router
module.exports = router;