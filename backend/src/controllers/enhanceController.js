const askAI = require("../services/geminiService");

const enhancePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    const enhancedPrompt = await askAI(`
You are an expert prompt engineer.

Rewrite the user's prompt to get better AI responses.

Rules:
- Keep original intent
- Add clarity
- Add context
- Improve structure

Return only the improved prompt.

Prompt:
${prompt}
`);

    res.json({
      success: true,
      enhancedPrompt,
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
  enhancePrompt,
};