# 🔒 LockIn List - Secure Version

Turn overwhelming teacher emails into clear, actionable to-do lists! Built with security in mind - your API key stays safe on the server.

## 🎯 What It Does

LockIn List helps students who feel overwhelmed by dense blocks of text (like teacher emails) by:
- ✅ Breaking down complex assignments into simple tasks
- ⏰ Providing realistic time estimates for each task  
- 🎯 Identifying the very first step to get started
- 📋 Organizing everything into a clean, scannable format

## 🔐 Security Features

- **API Key Protection**: Your Gemini API key is stored securely on the server, never exposed to the browser
- **Server-Side Proxy**: All AI requests go through our secure backend
- **Environment Variables**: Sensitive configuration is handled through .env files

## 🚀 Quick Start

### 1. Get Your API Key
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in with your Google account
- Create a new API key (it's free!)

### 2. Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your API key
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### 3. Run
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
lockin-list/
├── server.js          # Secure Express backend with API proxy
├── lockin-list.html   # Frontend application (no API keys!)
├── package.json       # Dependencies
├── .env              # Your API key (keep this private!)
├── .env.example      # Template for environment setup
└── README.md         # This file
```

## 🔧 How It Works

1. **Frontend**: Student pastes confusing text into the clean, friendly interface
2. **Secure Backend**: Text is sent to our Node.js server (not directly to Gemini)
3. **API Proxy**: Server forwards request to Gemini AI using your secure API key
4. **AI Processing**: Gemini transforms the text using our specialized prompt
5. **Clean Output**: Results are formatted and displayed with tasks, deadlines, and first steps

## 🎨 Features

- **Student-Friendly Design**: Casual tone, emojis, encouraging language
- **Modern UI**: Gradient backgrounds, smooth animations, responsive design
- **Time Estimates**: Realistic time predictions for high school students
- **Clear Organization**: Separate sections for tasks, due dates, and first steps
- **Secure Architecture**: No API keys in client-side code

## 🛡️ Security Best Practices

✅ **DO:**
- Keep your `.env` file private (it's in .gitignore)
- Use environment variables for all sensitive config
- Run the server in a secure environment

❌ **DON'T:**
- Commit API keys to version control
- Share your `.env` file with others
- Put API keys in client-side code

## 🌐 Deployment

### GitHub + Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/yourusername/lockin-list.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" and import your repository
   - In Environment Variables, add: `GEMINI_API_KEY` = `your_api_key_here`
   - Click Deploy!

### Other Platforms

The app works on any Node.js platform:
- **Heroku**: `git push heroku main`
- **Railway**: Connect your GitHub repo
- **Digital Ocean**: Deploy to App Platform

**Important**: Remember to set your `GEMINI_API_KEY` environment variable in your deployment platform!

## 📝 Example

**Input**: Confusing teacher email about poetry assignment
**Output**: 
- 📋 **Your Tasks**: Clear list with time estimates
- ⏰ **Due Dates**: When everything is due
- 🎯 **Start Here**: Exact first step to take

## 🎓 Perfect For

- High school students feeling overwhelmed by complex assignments
- Anyone who gets confused by dense email instructions
- Students with executive functioning challenges
- People who need help breaking down big tasks into smaller steps

---

Made for students who need that extra boost 💪 | Powered by AI | Secured by design 🔒