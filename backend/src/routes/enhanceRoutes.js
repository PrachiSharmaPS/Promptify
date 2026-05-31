const express = require("express");
const router = express.Router();

const { enhancePrompt } = require("../controllers/enhanceController");

router.post("/enhance", enhancePrompt);

module.exports = router;