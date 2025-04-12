const { ModelServiceClient } = require('@google-cloud/aiplatform');

const client = new ModelServiceClient({
  apiKey: process.env.GEMINI_API_KEY,
});

async function listModels() {
  try {
    const [models] = await client.listModels();
    console.log('Available models:');
    models.forEach(model => {
      console.log(`Model ID: ${model.name}, Supported Methods: ${model.supportedMethods}`);
    });
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();