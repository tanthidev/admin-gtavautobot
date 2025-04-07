const mongoose = require('mongoose');

const loginsSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Device_id: {
        type: String,
        required: true
    },
    LoginTime: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ['Success', 'Failed'],
        default: 'Success'
    },
    Note: {
        type: String,
        default: null
    }
}, { timestamps: true });

// Explicitly specify the collection name as 'logins'
const LoginsModel = mongoose.model('Logins', loginsSchema, 'logins');

module.exports = LoginsModel;