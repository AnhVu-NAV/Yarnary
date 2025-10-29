import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

function buildPrompt(formData: any): string {
    let prompt = "A photorealistic image of a crocheted handmade bag. ";
    prompt += `The style is a ${formData.bagType || 'fashion bag'}. `;
    if (formData.colors) {
        prompt += `The main colors are ${formData.colors}. `;
    }
    if (formData.pattern) {
        prompt += `It has a ${formData.pattern} pattern. `;
    }
    if (formData.specialFeatures) {
        prompt += `Special features include ${formData.specialFeatures}. `;
    }
    prompt += "Chunky yarn texture, studio lighting, detailed, clear photography.";
    return prompt;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();
        const prompt = buildPrompt(formData);

        console.log("🚀 Sending request to Replicate with prompt:", prompt);

        // --- SỬA LỖI CHÍNH TẠI ĐÂY ---
        // Sử dụng một URL ảnh công khai mà Replicate có thể truy cập
        const publicImageUrl = "https://replicate.delivery/pbxt/IZi22ZpYA3s5n2F2p4o2J8cff3nQ2N1T1f7k5S8e5Jelc3eE/out-0.png";

        const output = await replicate.run(
            // Đây là model img2img, yêu cầu ảnh đầu vào
            "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
            {
                input: {
                    prompt: prompt,
                    image: publicImageUrl, // Sử dụng URL công khai
                    strength: 0.8,
                },
            }
        );

        console.log("✅ Received output from Replicate:", output);

        const generatedImageUrl = Array.isArray(output) && output.length > 0 ? output[0] : null;

        if (!generatedImageUrl) {
            throw new Error("AI did not return a valid image URL.");
        }

        return NextResponse.json({ generatedImageUrl });

    } catch (error: any) {
        console.error("AI image generation failed:", error);
        return NextResponse.json(
            { message: "Failed to generate image", detail: error.message },
            { status: 500 }
        );
    }
}