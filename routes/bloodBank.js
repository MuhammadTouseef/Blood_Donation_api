const express = require('express');


const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const {find} = require("../controllers/bloodBank");

router.use(protect);
router.use(authorize('user'));

router.get("/", find )

module.exports = router;
