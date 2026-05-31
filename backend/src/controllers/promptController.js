const analyzeIntent = require("../agents/intentAgent");
const generateQuestions = require("../agents/questionAgent");
const buildPrompt = require("../agents/promptAgent");

const analyzePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const intent = await analyzeIntent(prompt);

    const questions = await generateQuestions(intent);

    res.json({
      success: true,
      intent,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generatePrompt = async (req, res) => {
  try {
    const { originalPrompt, answers } = req.body;

    const optimizedPrompt = await buildPrompt(
      originalPrompt,
      answers
    );

    res.json({
      success: true,
      optimizedPrompt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzePrompt,
  generatePrompt,
};