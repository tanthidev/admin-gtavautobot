const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', (req, res) => {
    if (!req.session.account || req.session.account.Note !== 'admin') {
        return res.redirect('/auth/login'); // Redirect to login if not admin
    }

    res.send('Welcome to the Admin Panel'); // Render admin panel
});
// Route to get the admin dashboard
router.get('/dashboard', authMiddleware.isAdmin, adminController.getDashboard);
router.get('/dashboard/list/:type', adminController.getDashboardList);
// CRUD for Accounts
// Route để xem chi tiết tài khoản theo username
router.get('/accounts/:username', adminController.getAccountDetails);
router.get('/accounts/edit/:id', adminController.editAccount);
router.post('/accounts/update/:id', adminController.updateAccount);
router.get('/accounts/delete/:id', adminController.deleteAccount);


// Route to get accounts
router.get('/accounts', authMiddleware.isAdmin, adminController.getAccounts);

// Route to get error logs
router.get('/error-logs', authMiddleware.isAdmin, adminController.getErrorLogs);

module.exports = router;