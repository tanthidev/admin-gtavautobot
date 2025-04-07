const express = require('express');
const { loginUser, logoutUser } = require('../controllers/authController');
const router = express.Router();
const bcrypt = require('bcrypt');
const AccountsModel = require('../models/accountsModel');

// Render login page
router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './src/views' }); // Serve the login page
});

// Handle login form submission
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const account = await AccountsModel.findOne({ Username: username });
        if (!account) {
            return res.status(401).send('Invalid username or password');
        }

        // Verify password
        const hashedPassword = hashPassword(password);
        if (hashedPassword !== account.Password) {
            return res.status(401).send('Invalid username or password');
        }

        // Set session and log it for debugging
        req.session.account = account;

        // Redirect to admin panel
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Route for user logout
router.get('/logout', logoutUser);


// Password hashing function
function hashPassword(password, salt = 'gtav_autobot') {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(salt + password).digest('hex');
}
module.exports = router;