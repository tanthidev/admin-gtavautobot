exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set user session
        req.session.userId = user._id;
        req.session.role = user.role;

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.logoutUser = (req, res) => {

    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Logout failed', error: err });
        }

        console.log('Session destroyed');
        res.clearCookie('connect.sid'); // Xóa cookie session
        res.redirect('/auth/login'); // Chuyển hướng về trang đăng nhập
    });
};