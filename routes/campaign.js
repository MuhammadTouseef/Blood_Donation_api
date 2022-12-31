const express = require('express');


const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const {createCampaigns, getMyCampaigns, findCampaign, campaignDetails, acceptDonor, donate} = require("../controllers/Campaign");


router.use(protect);
router.use(authorize('user'));

router.route('/').post(createCampaigns).get(getMyCampaigns)
router.get('/all', findCampaign)
router.route('/:id').get(campaignDetails).put(donate)
router.put('/:id/:donor', acceptDonor)


module.exports = router;
