const askAI = require("../services/geminiService");

async function buildPrompt(originalPrompt, answers) {
  const prompt = `
You are a professional prompt engineer.

Transform the user's request into a detailed AI prompt.

Original Request:
${originalPrompt}

Collected Information:
${JSON.stringify(answers, null, 2)}

Generate a professional prompt.

Do not explain anything.
Return only the final prompt.
`;

  return await askAI(prompt);
}

module.exports = buildPrompt;