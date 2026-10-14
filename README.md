# SwasthyaSathi AI (स्वास्थ्य साथी) 🩺

> **AI-Powered Healthcare Companion for Frontline Health Workers and Rural Communities**

SwasthyaSathi AI is built to empower frontline community health workers (ASHAs, ANMs, and Anganwadi workers) with an intelligent, offline-capable digital assistant for doorstep care, high-risk maternal triage, child immunization tracking, and community disease surveillance.

---

## 🌟 Stage 2: Genuine Conversational AI Upgrade

The AI Health Assistant in SwasthyaSathi AI is now powered by **Google Gemini** using the official **Google Gen AI Python SDK (`google-genai`)** with a dedicated Python Flask backend and multi-lingual clinical safety guardrails.

### ✨ What Was Upgraded

1. **Python Flask Backend (`/backend`)**:
   - `POST /api/assistant/chat`: Conversational endpoint that formats conversation history, enforces healthcare safety prompts, and queries Gemini.
   - `GET /api/health`: Availability check exposing backend and configuration status without leaking API keys.
   - CORS restricted to the local frontend origins (`http://localhost:3000`, `http://127.0.0.1:3000`).
   - Unicode-safe JSON output (`ensure_ascii=False`) for clean rendering of Telugu (తెలుగు) and Hindi (हिन्दी) scripts.

2. **Official Google Gen AI SDK Integration**:
   - Powered by `google-genai` (`from google import genai`).
   - Reads `GEMINI_API_KEY` exclusively from backend environment/`.env`. The key is **never** bundled into frontend code or committed to git.
   - Configurable model through `GEMINI_MODEL` (default: `gemini-2.5-flash`).
   - Granular error handling for invalid keys (401/403), unavailable models (404), rate limit/quota exhaustion (429), and provider outages (503).

3. **Multi-Turn Conversational Interface**:
   - Preserves conversation history across turns so the AI remembers context (e.g. previous vitals or symptoms mentioned).
   - Real-time loading indicator with spinner while the model processes.
   - Prevents duplicate button submissions while a request is in flight.
   - Error banner with an instant **"Retry"** button if network or provider errors occur.
   - Reset conversation button (`RotateCcw`) to start a clean triage session.

4. **Multi-Lingual Support (English, Telugu, Hindi)**:
   - Dedicated language selector in the assistant:
     - 🇬🇧 **English**
     - 🇮🇳 **తెలుగు (Telugu)**
     - 🇮🇳 **हिन्दी (Hindi)**
   - Tailored system instructions ensuring the AI responds in the chosen language using culturally grounded, understandable vocabulary.

5. **Healthcare Safety & Red Flag Triage**:
   - Explicit boundaries: provides triage and health education, **not** definitive diagnosis or autonomous prescriptions.
   - Automatic emergency symptom detection (e.g., severe obstetric hemorrhage, pre-eclampsia BP > 160/110 with vision changes, acute neonatal respiratory distress).
   - Immediate **"Call 108 Ambulance"** button prominently displayed on emergency responses.
   - PII sanitization: redacts phone and Aadhaar-like numbers before sending queries to the AI provider.

---

## 📁 Project Structure

```
SwasthyaSathi-AI/
├── index.html                   # HTML entrypoint with viewport & fonts
├── package.json                 # Dependencies (React 18, Vite, Tailwind CSS, Lucide)
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration with /api proxy to Flask (port 5000)
├── tailwind.config.js           # Healthcare blue & teal color system
├── start-dev.bat                # 1-click Windows runner for frontend
├── start-backend.bat            # 1-click Windows runner for backend
├── .gitignore                   # Excludes .env, venv/, node_modules/, etc.
├── src/
│   ├── main.tsx                 # React root entrypoint
│   ├── App.tsx                  # Root layout, navigation coordinator & SOS modal
│   ├── types/                   # TypeScript interfaces
│   ├── data/                    # Labelled synthetic demo data
│   └── components/
│       ├── common/              # Badge, Card, DemoBadge, StatCard
│       ├── layout/              # Sidebar (8 sections) & Header (search, language, SOS)
│       ├── dashboard/           # WeeklyVisitsChart, RecentActivity, HighPriorityAlerts
│       └── views/
│           ├── AssistantView.tsx  # Upgraded Gemini chat with Telugu/Hindi & safety controls
│           ├── DashboardView.tsx  # Executive dashboard
│           ├── HouseholdsView.tsx # Family registry with ABHA IDs
│           ├── FieldVisitsView.tsx# Doorstep visit roster & bedside vitals modal
│           ├── RemindersView.tsx  # Timetable for vaccines & medications
│           ├── InsightsView.tsx   # Epidemiological metrics
│           ├── ReportsView.tsx    # NHM monthly ASHA performance report
│           └── SettingsView.tsx   # Offline cache & language preferences
└── backend/
    ├── app.py                   # Flask REST server (/api/health, /api/assistant/chat)
    ├── gemini_service.py        # google-genai client, safety prompts, emergency detection
    ├── requirements.txt         # Flask, flask-cors, python-dotenv, google-genai
    ├── .env.example             # Environment template with placeholders only
    ├── .env                     # Your local API key (git-ignored)
    └── .gitignore               # Excludes .env and venv/
```

---

## 🚀 How to Run Locally on Windows

Running SwasthyaSathi AI with Gemini requires two separate terminal windows (one for the backend, one for the frontend).

### 🖥️ Terminal 1: Run the Backend (Flask API)

1. Open PowerShell and navigate to the project directory:
   ```powershell
   cd c:\Users\hindu\Documents\SwasthyaSathi-AI
   ```

2. If you haven't created the `.env` file yet, copy the example:
   ```powershell
   Copy-Item backend\.env.example backend\.env
   ```

3. Open `backend\.env` in Notepad or your editor and enter your Gemini API key:
   ```powershell
   notepad backend\.env
   ```
   Set:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   GEMINI_MODEL=gemini-2.5-flash
   ```

4. Start the backend:
   ```powershell
   backend\venv\Scripts\python.exe backend\app.py
   ```
   *(Alternatively, double-click `start-backend.bat` in File Explorer).*

   You will see:
   ```text
   Starting SwasthyaSathi AI Backend on http://127.0.0.1:5000
   * Running on http://127.0.0.1:5000
   ```

---

### 🖥️ Terminal 2: Run the Frontend (React + Vite)

1. Open a **second** PowerShell window:
   ```powershell
   cd c:\Users\hindu\Documents\SwasthyaSathi-AI
   ```

2. Start the Vite development server:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   npm.cmd run dev
   ```
   *(Alternatively, double-click `start-dev.bat` in File Explorer).*

   You will see:
   ```text
   ➜  Local:   http://localhost:3000/
   ```

---

## 🔑 How to Configure an Available Gemini Model

1. Visit [Google AI Studio](https://aistudio.google.com/) and generate an API key.
2. In `backend\.env`, set `GEMINI_API_KEY=AIzaSy...` (without spaces).
3. The default model is set to `gemini-2.5-flash`, which is fast, cost-effective, and multimodal.
4. If your Google AI Studio account uses a different model tier, you can configure:
   - `GEMINI_MODEL=gemini-2.5-flash` (Recommended for speed and clinical guidelines)
   - `GEMINI_MODEL=gemini-1.5-flash`
   - `GEMINI_MODEL=gemini-3.8-flash`
5. Restart Terminal 1 after changing `backend\.env`.

---

## 🔍 Step-by-Step Verification Guide

1. **Verify Backend Health**:
   Open your browser or run in PowerShell:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method Get
   ```
   Output:
   ```json
   {
     "api_key_configured": true,
     "model": "gemini-2.5-flash",
     "service": "SwasthyaSathi AI Backend",
     "status": "ok"
   }
   ```

2. **Open the Web Application**:
   Navigate to 👉 **[http://localhost:3000/](http://localhost:3000/)** in your browser.

3. **Navigate to AI Health Assistant**:
   Click **"AI Health Assistant"** in the sidebar.
   - Notice the status badge at the top shows: `Gemini Live (gemini-2.5-flash)`.
   - The safety disclaimer clearly reminds users that the assistant is an educational tool.

4. **Test Live Conversational AI**:
   - Type a new question: `"What are the warning signs of pre-eclampsia in pregnant mothers?"`
   - Press Enter or click Send.
   - Observe the real-time loading indicator: `"SwasthyaSathi AI is analyzing clinical triage protocols..."`.
   - The response is dynamically generated by Gemini.

5. **Test Multi-Turn Conversation**:
   - Ask a follow-up query: `"What should I tell her family about diet and resting position?"`.
   - Observe that Gemini remembers the context of pre-eclampsia from the first question.

6. **Test Telugu Language Support (తెలుగు)**:
   - Click the **తెలుగు** button in the language selector.
   - Click the prompt idea: `"👶 పసిపిల్లలలో తీవ్ర నీళ్ల విరేచనాలు & డీహైడ్రేషన్ సంకేతాలు"`.
   - Gemini will respond in fluent, grammatically correct Telugu script with standard medical terms (ORS, Zinc, 108).

7. **Test Emergency Detection & 108 Shortcut**:
   - Type: `"Patient has severe chest pain, shortness of breath and collapsed"`.
   - Observe that the response is highlighted with a red Emergency Warning badge and presents an immediate **"Call 108 Ambulance"** button.

8. **Test Error Handling & Retry**:
   - If `GEMINI_API_KEY` is not set or invalid, a clear error banner appears with a **"Retry Request"** button instead of a silent failure or mock answer.
