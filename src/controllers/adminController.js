const AccountsModel = require('../models/accountsModel');
const LoginsModel = require('../models/loginsModel');
const ErrorLogsModel = require('../models/errorLogsModel');

const Account = require('../models/accountsModel');

exports.getDashboard = async (req, res) => {
    const { search, status, page = 1 } = req.query;
    const limit = 10; // Số lượng tài khoản trên mỗi trang
    const query = {};

    // Tìm kiếm theo username, toolname
    if (search) {
        query.$or = [
            { Username: { $regex: search, $options: 'i' } }, // Tìm kiếm không phân biệt hoa thường theo Username
            { ToolName: { $regex: search, $options: 'i' } }  // Tìm kiếm không phân biệt hoa thường theo ToolName
        ];
    }

    // Lọc theo trạng thái
    if (status) {
        query.Status = status;
    }
    const errorLogs = await ErrorLogsModel.find().sort({ time: -1 }).limit(50); // Lấy tối đa 50 log gần nhất
    const activeAccounts = await AccountsModel.countDocuments({ Status: 'Active' }); // Số tài khoản Active
    const inactiveAccounts = await AccountsModel.countDocuments({ Status: 'Inactive' }); // Số tài khoản Inactive
    const totalErrorLogs = await ErrorLogsModel.countDocuments();
    const loggedInUsers = await AccountsModel.countDocuments({ LoggedIn: 'Yes' }); // Số người đang login
    // Tính toán pagination
    const totalAccounts = await Account.countDocuments(query);

    const totalPages = Math.ceil(totalAccounts / limit);
    const accounts = await Account.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

    res.render('dashboard', {
        totalAccounts,
        activeAccounts,
        inactiveAccounts,
        totalErrorLogs,
        loggedInUsers, 
        accounts,
        errorLogs,
        search,
        status,
        pagination: {
            currentPage: parseInt(page),
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? parseInt(page) + 1 : null,
        },
    });
};

exports.getDashboardList = async (req, res) => {
    try {
        const { type } = req.params; // Lấy loại danh sách từ URL
        let accounts = [];

        if (type === 'loggedIn') {
            accounts = await AccountsModel.find({ LoggedIn: "Yes" }); // Lấy danh sách người đang login
        } else if (type === 'active') {
            accounts = await AccountsModel.find({ Status: 'Active' }); // Lấy danh sách tài khoản Active
        } else if (type === 'inactive') {
            accounts = await AccountsModel.find({ Status: 'Inactive' }); // Lấy danh sách tài khoản Inactive
        } else if (type === 'all') {
            accounts = await AccountsModel.find(); // Lấy tất cả tài khoản
        }

        res.render('dashboardList', { accounts, type }); // Truyền danh sách vào view
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAccountDetails = async (req, res) => {
    try {
        const username = req.params.username; // Lấy username từ URL

        // Tìm tài khoản theo username
        const account = await AccountsModel.findOne({ Username: username });

        if (!account) {
            return res.status(404).send('Account not found');
        }

        // Lấy lịch sử đăng nhập
        const loginHistory = await LoginsModel.find({ Username: username }).sort({ loginTime: -1 });

        res.render('accountDetails', {
            account,
            loginHistory, // Chỉ truyền thông tin tài khoản và lịch sử đăng nhập
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.editAccount = async (req, res) => {
    try {
        const accountId = req.params.id; // Lấy ID từ URL
        const account = await AccountsModel.findById(accountId); // Tìm tài khoản theo ID

        if (!account) {
            return res.status(404).send('Account not found');
        }

        res.render('editAccount', { account }); // Truyền dữ liệu vào view
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const {
            Username,
            Status,
            ToolName,
            Expiration,
            Device_id,
            LoggedIn,
            LastLogin,
            LastPing,
            DeviceChangesToday,
            LimitedChanges,
            LastReset,
            RegisterDate,
            Note
        } = req.body;

        await AccountsModel.findByIdAndUpdate(accountId, {
            Username,
            Status,
            ToolName: ToolName.split(',').map(tool => tool.trim()), // Convert comma-separated string to array
            Expiration,
            Device_id,
            LoggedIn, 
            LastLogin,
            LastPing,
            DeviceChangesToday: parseInt(DeviceChangesToday, 10),
            LimitedChanges: parseInt(LimitedChanges, 10),
            LastReset,
            RegisterDate,
            Note
        });

        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteAccount = async (req, res) => {
    const accountId = req.params.id;
    await AccountsModel.findByIdAndDelete(accountId);
    res.redirect('/admin/dashboard');
};

exports.getAccounts = async (req, res) => {
    try {
        // Fetch all user accounts from the database
        const accounts = await User.find({});
        res.render('accounts', { title: 'Manage Accounts', accounts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getErrorLogs = async (req, res) => {
    try {
        // Fetch error logs from the database or log file
        const logs = await getErrorLogsFromDatabase(); // Assume this function is defined elsewhere
        res.render('errorLogs', { title: 'Error Logs', logs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};