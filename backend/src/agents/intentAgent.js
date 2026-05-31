const askAI = require("../services/geminiService");

async function analyzeIntent(userPrompt) {
  const prompt = `
You are an AI requirement analyst.

Analyze the user request.

Return JSON only.

Format:
{
  "category":"",
  "goal":"",
  "missing":[]
}

User Request:
${userPrompt}
`;

const cleanJson = require("../utils/cleanJson");

const response = await askAI(prompt);

console.log("Gemini Response:");
console.log(response);

const cleaned = cleanJson(response);

return JSON.parse(cleaned);
}

module.exports = analyzeIntent;