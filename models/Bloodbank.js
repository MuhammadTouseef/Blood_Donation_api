const mongoose = require('mongoose');


const BloodbankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a blood bank name']
    },
    address: {
        type: String,
        required: [true, 'Please add a blood bank address']
    },
    phonenumber: {
        type: String,
        required: [true, 'Please add a phonenumber']
    },

});

module.exports = mongoose.model('Bloodbank', BloodbankSchema);
