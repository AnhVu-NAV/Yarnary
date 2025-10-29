import Replicate from "replicate";

const replicate = new Replicate();

const FIXED_IMAGE_URL = "https://localhost/tui-mau.png";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }


        const output = await replicate.run(
            "stability-ai/stable-diffusion-img2img:15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6FEB1d660857",
            {
                input: {
                    prompt: prompt,
                    image: FIXED_IMAGE_URL,
                },
            }
        );

        res.status(200).json({ generatedImageUrl: output[0] });

    } catch (error) {
        console.error("AI image generation failed:", error);
        res.status(500).json({ message: "Failed to generate image" });
    }
}