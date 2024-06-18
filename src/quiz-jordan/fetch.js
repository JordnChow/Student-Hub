// import { API } from "./api";
import { marked } from 'https://cdn.jsdelivr.net/npm/marked@5.0.1/lib/marked.esm.js';
const API = "AIzaSyBNblPS_iI9TSEkHLWH2-zqmErgpjO-VuE"
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function fetchAI(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = marked(response.text());
        return text;
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

function formatText(input) {
    // Replace **text** with <strong>text</strong>
    input = input.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Split the input by sentence boundaries
    let sentences = input.split(/(?<=[.!?:])\s+/);
    let formattedText = "";

    sentences.forEach(sentence => {
        sentence = sentence.trim();
        
        // Handle headings indicated by ##
        if (sentence.startsWith('##')) {
            formattedText += `<h3>${sentence.slice(2).trim()}</h3>`;
        } else if (sentence.endsWith('*')) {
            // Remove the trailing * and add a new line
            sentence.trim()
            formattedText += `${sentence.slice(0, -1)}<br>`;
        } else {
            // Wrap the sentence in <p> tags
            formattedText += `<p>${sentence}</p>`;
        }
    });
    return formattedText;
}



export default fetchAI;