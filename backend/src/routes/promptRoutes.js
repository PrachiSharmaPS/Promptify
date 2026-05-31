const express = require("express");

const router = express.Router();

const {
  analyzePrompt,
  generatePrompt,
} = require("../controllers/promptController");

router.post("/analyze", analyzePrompt);

router.post("/generate", generatePrompt);

module.exports = router;