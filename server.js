const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// System prompt for Gemini AI
const systemPrompt = `You are 'LockIn List,' an AI that helps students who feel overwhelmed. Your job is to read a block of text (like a teacher's email) and turn it into a simple, clear, actionable to-do list. The user is a 15-year-old high school sophomore.

CRITICAL RULES:
* DO NOT do the homework, write any part of the assignment, or answer questions.
* ONLY extract tasks, deadlines, and materials.
* ALWAYS identify the very first, smallest step the user should take (e.g., "Open the PDF," "Create a new doc," "Read the two poems").
* ADD TIME ESTIMATES: For each task, provide a reasonable time estimate in minutes or hours (e.g., "~30 mins," "~1 hour"). Base this on a typical 15-year-old high school sophomore's workload.
* FORMAT your response clearly. Use simple bullet points.

Example Output Structure:
TASKS:
* Write a 300-word analysis. (~45 mins)
* Upload it to the 'Poetry' portal. (~5 mins)

DUE:
* This Friday (before class).

FIRST STEP:
* Open the "guiding questions" PDF. (~10 mins)`;

// API proxy endpoint
app.post('/api/process-text', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY environment variable is not set');
            return res.status(500).json({ error: 'Server configuration error. Please check API key.' });
        }

        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUser's text to process:\n${text}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API error:', response.status, errorData);
            return res.status(response.status).json({ 
                error: `API Error: ${response.status} ${response.statusText}` 
            });
        }

        const data = await response.json();
        const result = data.candidates[0].content.parts[0].text;
        
        res.json({ result });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again!' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'LockIn List server is running!',
        hasApiKey: !!process.env.GEMINI_API_KEY
    });
});

// Serve the main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'lockin-list.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 LockIn List server running on port ${PORT}`);
    console.log(`📱 App available at: http://localhost:${PORT}`);
    console.log(`🔑 API Key configured: ${process.env.GEMINI_API_KEY ? '✅ Yes' : '❌ No - Please set GEMINI_API_KEY in .env file'}`);
});