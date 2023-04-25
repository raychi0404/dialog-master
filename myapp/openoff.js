const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-45xoI3aJWcAeavfB7y6voH3u",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function generateText() {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "我想去捷運站",
    });
    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

generateText();
