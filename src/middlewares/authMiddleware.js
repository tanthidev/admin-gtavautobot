module.exports.isAdmin = (req, res, next) => {
    if (!req.session.account || req.session.account.Note !== 'admin') {
        console.log('Access denied: Not an admin or session missing');
        return res.redirect('/auth/login');
    }
    console.log('Access granted: Admin session verified');
    next();
};