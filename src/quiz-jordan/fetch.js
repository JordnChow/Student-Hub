// import { API } from "./api";
const API = "AIzaSyBNblPS_iI9TSEkHLWH2-zqmErgpjO-VuE"
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function fetchAI(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = formatText(response.text());
        return text;
    } catch (error) {
        console.error("Error generating content:", error.errorDetails);
    }
}

function formatText(input) {
    let sentences = input.split(/(?<=[.!?])\s+/);
    let formattedText = "";

    sentences.forEach(sentence => {
        if (sentence.includes("**")) {
            sentence = sentence.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }

        // Check for bullet point pattern
        if (sentence.endsWith('*')) {
            formattedText += `<li>${sentence.slice(0, -1).trim()}</li>`;
        } else {
            formattedText += `<p>${sentence}</p>`;
        }
    });

    return formattedText;
}


export default fetchAI;