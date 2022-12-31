const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Campaign = require('../models/Campaign')


exports.createCampaigns = asyncHandler(async (req, res, next) => {

    let {bloodGroup, hospital, phonenumber, patientName, location, details} = req.body
    let createdBy = req.user.id
    let data = await Campaign.create({
        bloodGroup, hospital, phonenumber, patientName, location, details, createdBy
    })
    res.status(200).json({success: true, data})

})

exports.getMyCampaigns = asyncHandler(async (req, res, next) => {


    let user = req.user.id
    let data = await Campaign.find({
        "createdBy": user
    }).select('bloodGroup hospital location')
    res.status(200).json({success: true, data})

})

exports.findCampaign = asyncHandler(async (req, res, next) => {

    let data = await Campaign.find({
        'location': {'$regex': req.query.search ? req.query.search : '', '$options': 'i'},
        "active": true
    })
    res.status(200).json({success: true, data})

})

exports.campaignDetails = asyncHandler(async (req, res, next) => {
    let id = req.params.id

    let data = await Campaign.findByIdAndUpdate(id).
    populate("acceptedDonor donors",{"resetPasswordExpire": 0, "resetPasswordToken":0 })


    // populate('createdBy').populate('donors').populate('acceptedDonor')
    res.status(200).json({success: true, data})

})

exports.donate = asyncHandler(async (req, res, next) => {
    let id = req.params.id

    let data = await Campaign.findByIdAndUpdate(id, {$addToSet: {donors: req.user.id}}, {
        new: true,
        runValidators: true
    })
    res.status(200).json({success: true, data})

})

exports.acceptDonor = asyncHandler(async (req, res, next) => {
    let id = req.params.id
    let donor = req.params.donor

    let data = await Campaign.findById(id)
    if (data.createdBy.toString() !== req.user.id) {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update `,
                401
            )
        );
    }
    data = await Campaign.findByIdAndUpdate(id, {
        "acceptedDonor": donor,
        "active": false
    }, {
        new: true,

    })


    res.status(200).json({success: true, data})

})




