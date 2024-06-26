// import { API } from "./api";
import { marked } from 'https://cdn.jsdelivr.net/npm/marked@5.0.1/lib/marked.esm.js';
const API = "AIzaSyCAlnZotTuIrvwLHWRYWPc-jm3p_0DK56w"
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



export default fetchAI;