const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    ToolName: {
        type: [String], // Array of strings
        required: true
    },
    Expiration: {
        type: String,
        default: null
    },
    Device_id: {
        type: String,
        default: null
    },
    LoggedIn: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    LastLogin: {
        type: String,
        default: null
    },
    LastPing: {
        type: String,
        default: null
    },
    DeviceChangesToday: {
        type: Number,
        default: 0
    },
    LimitedChanges: {
        type: Number,
        default: 5
    },
    LastReset: {
        type: String,
        default: null
    },
    RegisterDate: {
        type: String,
        default: null
    },
    Note: {
        type: String,
        default: 'None'
    }
}, { timestamps: true });

// Explicitly specify the collection name as 'accounts'
const AccountsModel = mongoose.model('Accounts', accountsSchema, 'accounts');

module.exports = AccountsModel;