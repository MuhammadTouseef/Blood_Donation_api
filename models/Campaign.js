const mongoose = require('mongoose');


const CampaignSchema = new mongoose.Schema({
    active:{
        type:Boolean,
        default: true
    },
    bloodGroup: {
        type: String,
        required: [true, 'Please add a blood group']
    },
    hospital: {
        type: String,
        required: [true, 'Please add a blood bank address']
    },
    phonenumber: {
        type: String,
        required: [true, 'Please add a phonenumber']
    },
    patientName: {
        type: String,
        required: [true, 'Please add a patient name']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    details: {
        type: String,
        required: [true, 'Please add case details']
    },
    acceptedDonor:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',

    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    donors:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            unique:true

        }
    ]



});

CampaignSchema.pre('save', async function(next) {
    if (this.isModified('acceptedDonor')) {
        this.active = false

    }
    next();

});

module.exports = mongoose.model('Campaign', CampaignSchema);
