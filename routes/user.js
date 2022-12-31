const express = require('express');


const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const {userUpdate, feedback} = require("../controllers/User");


router.use(protect);
router.use(authorize('user'));

router.put("/", userUpdate )
router.post("/feedback",feedback)

module.exports = router;
