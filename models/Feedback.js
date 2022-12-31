const mongoose = require('mongoose');


const FeedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Please add feedback']
    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }



});

module.exports = mongoose.model('Feedback', FeedbackSchema);
