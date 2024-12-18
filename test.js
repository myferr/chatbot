import { GeminiService } from "intelligent";

async function generateResponse() {
  const gemini = new GeminiService("AIzaSyB2eYSAE35B-bKY8NshAs-7qVvLupAq-q4");
  const response = await gemini.response("Why is the sky blue?");
  return response;
}

async function main() {
  const response = await generateResponse();
  return response; // Log the response
}

main().then(async (res) => {
  console.log(res);
});
