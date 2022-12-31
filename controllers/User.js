const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require("../models/User")
const Feedback = require("../models/Feedback")

exports.feedback = asyncHandler(async (req, res, next) => {
let user = req.user.id
    let data = await Feedback.create({
        "message": req.body.message,
        "createdBy": user
    })
    res.status(200).json({success: true, data})

})

exports.userUpdate = asyncHandler(async (req, res, next) => {
    let user = req.user.id
    let {name,phonenumber,bloodgroup,gender,address,medication,illness} = req.body

    let data = await User.findByIdAndUpdate(user,{
        name,phonenumber,bloodgroup,gender,address,medication,illness
    }, {
        new: true,

    })
    res.status(200).json({success: true, data:"User Updated"})

})
