const askAI = require("../services/geminiService");

async function generateQuestions(intentData) {
  const prompt = `
Generate questions for the missing information.

Missing Information:
${JSON.stringify(intentData.missing)}

Return JSON array only.

Example:
[
 {
  "key":"target_users",
  "question":"Who will use the application?"
 }
]
`;

  const response = await askAI(prompt);

  const cleanJson = require("../utils/cleanJson");

const cleaned = cleanJson(response);

return JSON.parse(cleaned);
}

module.exports = generateQuestions;