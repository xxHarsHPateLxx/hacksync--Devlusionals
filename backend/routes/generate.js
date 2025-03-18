import { Router } from 'express';
import axios from 'axios';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
const router = Router();

// Helper function: Wait for given milliseconds
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function: Handle model loading and retries
async function generateScriptWithRetries(prompt, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B',
        { inputs: prompt },
        {
          headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
          responseType: 'json' // Ensure response is parsed as JSON
        }
      );

      if (response.data.error?.includes('currently loading')) {
        const waitTime = response.data.estimated_time || 30;
        console.log(`⏳ Model loading. Waiting for ${waitTime} seconds...`);
        await wait(waitTime * 1000); // Wait for estimated time
      } else {
        return response.data[0]?.generated_text;
      }

    } catch (error) {
      console.error("⚠️ Error in API Call:", error.response ? error.response.data : error.message);
      if (attempt < retries) {
        console.log(`🔁 Retrying attempt ${attempt}...`);
        await wait(5000); // Wait 5 seconds before retrying
      } else {
        throw new Error('Failed after multiple retries due to model loading or API issues.');
      }
    }
  }
  throw new Error('Unable to generate script after retries.');
}

// Route to generate podcast script and audio
router.post('/', async (req, res) => {
  const { topic, tone, length } = req.body;

  // Validate input
  if (!topic || !tone || !length) {
    return res.status(400).json({ error: "Missing required fields: topic, tone, or length" });
  }

  console.log("📥 Received Request:");
  console.log(`📝 Topic: ${topic}`);
  console.log(`🎭 Tone: ${tone}`);
  console.log(`⏱️ Length: ${length} minutes`);

  const prompt = `Create a ${length}-minute podcast on "${topic}" in a ${tone} tone with an engaging intro, main content, and conclusion.`;

  try {
    // Step 1: Generate Podcast Script
    console.log("🎙️ Generating podcast script...");
    const generatedScript = await generateScriptWithRetries(prompt);
    if (!generatedScript) {
      throw new Error("Failed to generate script from AI model.");
    }
    console.log("✅ Script generated successfully!");

    // Step 2: Convert Script to Audio (Text-to-Speech)
    console.log("🎧 Converting script to audio...");
    const ttsResponse = await axios.post(
      'https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits',
      { inputs: generatedScript },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
        responseType: 'arraybuffer' // For binary audio data
      }
    );

    // Step 3: Save Audio File
    const audioBuffer = Buffer.from(ttsResponse.data, 'binary');
    const audioFileName = `podcast_${Date.now()}.wav`;
    const audioDir = join(__dirname, '..', 'audio');

    if (!existsSync(audioDir)) {
      mkdirSync(audioDir);
    }

    const audioPath = join(audioDir, audioFileName);
    writeFileSync(audioPath, audioBuffer);
    console.log(`✅ Audio saved at: ${audioPath}`);

    // Step 4: Send Response
    res.status(200).json({
      script: generatedScript,
      audioUrl: `http://localhost:${process.env.PORT || 5000}/audio/${audioFileName}`
    });

  } catch (error) {
    console.error("❌ Error generating podcast:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate podcast.' });
  }
});

export default router;
