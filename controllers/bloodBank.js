const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const BloodBank = require('../models/Bloodbank')

exports.find = asyncHandler(async (req, res, next) => {

    let data = await BloodBank.find({'address': {'$regex': req.query.search, '$options': 'i'}})
    res.status(200).json({success: true, data})

})
