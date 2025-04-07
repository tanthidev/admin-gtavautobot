const mongoose = require('mongoose');

const errorLogsSchema = new mongoose.Schema({
    error_message: {
        type: String,
        required: true
    },
    tool: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Explicitly specify the collection name as 'error_logs'
const ErrorLogsModel = mongoose.model('ErrorLogs', errorLogsSchema, 'error_logs');

module.exports = ErrorLogsModel;