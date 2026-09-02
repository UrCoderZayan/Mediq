<div align="center">
  <img src="./assets/vitalis.png" alt="Vitalis AI Banner" width="100%" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
  
  # � Mediq
  
  **A secure, educational health-information assistant with structured safety guidance.**
  
  [![Powered by Llama 3](https://img.shields.io/badge/Powered%20by-Llama%203-blue?style=for-the-badge)](https://ai.meta.com/llama/)
  [![Hosted on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
  ![GitHub stars](https://img.shields.io/github/stars/Ritik0102-bit/Vitalis-AI?style=for-the-badge)
  ![License](https://img.shields.io/github/license/Ritik0102-bit/Vitalis-AI?style=for-the-badge)
</div>

## 📖 About Mediq

**Mediq** is a health-information assistant designed to help users explore symptoms, medicine references, and everyday wellness questions. It is educational only and does not diagnose conditions, prescribe treatment, or replace professional medical care.

Built with a responsive **glassmorphism UI**, the application provides structured health information, symptom safety checks, medicine references, local health tools, and multilingual assistant responses. AI requests pass through a server-side API route so provider credentials never reach the browser.

Whether you are logging a minor headache using the interactive body map, uploading an image for context, or exporting a session for discussion with a clinician, Mediq is designed as an educational personal health hub.

---

## 📑 Table of Contents
- [📸 Dashboard Preview](#-dashboard-preview)
- [✨ Core Features](#-core-features)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📂 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [💡 Usage Guide](#-usage-guide)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📸 Dashboard Preview

<div align="center">
  <img src="./assets/screenshot.png" alt="App Screenshot" width="800" style="border-radius: 8px; border: 1px solid #ddd;" />
</div>

---

## ✨ Core Features

| Feature | Description |
| :--- | :--- |
| 🌐 **Open Access** | Use every Mediq feature immediately without an account or sign-in. |
| 🗂️ **Local History** | Keep recent assistant, medicine, and health-tool activity in this browser. |
| 🧠 **Secure Healthcare AI** | Uses a server-side Groq-compatible API proxy with health-information safety instructions. |
| ☁️ **Serverless Inference** | `/api/chat` keeps provider credentials on the server through Netlify Functions. |
| 🧍 **Interactive Body Map** | Pinpoint exactly where it hurts using a clickable SVG human anatomy map. |
| 🌡️ **Dynamic Pain Scale** | Log symptom severity with a visual 1-10 slider featuring animated emoji feedback. |
| 💬 **Smart Suggestions** | Context-aware follow-up questions generated to guide the conversation. |
| 🎤 **Voice Input** | Speak directly to the AI for a hands-free diagnostic experience using the Web Speech API. |
| ⚡ **Quick Prompts** | Instantly analyze common issues (Headache, Fever, Cold, etc.) with a single click. |
| 🌍 **Multilingual Support** | Chat seamlessly in English, Spanish, French, Hindi, Chinese, or Arabic. |
| 🌓 **Dynamic Theme** | Beautiful dark mode (Carbon Black) and sleek light mode (Porcelain Base) with smooth CSS transitions. |
| 🖨️ **Export Session** | Download your entire diagnostic session as a clean, formatted PDF for personal records. |

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **HTML5 & CSS3:** Semantic markup, CSS Custom Properties, Glassmorphism aesthetics, and keyframe animations.
- **Vanilla JavaScript (ES6+):** Modular DOM manipulation, asynchronous API handling, and event-driven architecture.
### **Backend & APIs**
- **Netlify Functions:** Server-side handlers for AI and medicine search (`/api/chat`, `/api/medicineSearch`).

### **Artificial Intelligence Engine**
- **Provider:** Groq's OpenAI-compatible API, called only from the server-side `/api/chat` route.
- **Model:** Configurable through the server-only `GROQ_MODEL` environment variable.
- **Safety:** Responses are framed as educational information with red-flag escalation and professional-care guidance.

---

## 📂 Project Structure

```text
Vitalis-AI/
├── api/                 # Shared Node.js API handlers
│   ├── chat.js          # Securely proxies chat requests to the configured AI provider
│   ├── medicineSearch.js # Searches public medicine labels through openFDA
├── netlify/
│   └── functions/       # Netlify adapters for the shared API handlers
├── assets/              # Logos, demo GIFs, and screenshot images
├── index.html           # Main UI dashboard and modal layouts
├── script.js            # Core frontend logic and DOM interactions
├── style.css            # Responsive styles, theme variables, and animations
├── package.json         # Backend dependencies
├── netlify.toml         # Netlify publish, function, and API redirect configuration
└── README.md            # Project documentation
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Ritik0102-bit/Vitalis-AI.git
cd Vitalis-AI
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory based on `.env.example`:
```env
GROQ_API_KEY="gsk_..."
GROQ_MODEL="openai/gpt-oss-20b"
```
`GROQ_API_KEY` is required for live AI responses.

### 3. Run Locally
For the lightweight local server:
```bash
npm install
npm run dev
```
The application is available at `http://localhost:3000`.

### 4. Deploy to Netlify
Connect the repository in Netlify and publish the project root with no build command. Add `GROQ_API_KEY` and optionally `GROQ_MODEL` under Site configuration > Environment variables, then redeploy. Never prefix server secrets with `VITE_`, `NEXT_PUBLIC_`, or another public-client prefix.

---

## 💡 Usage Guide

1. **Describe Symptoms:** Type your symptoms into the chat box, click the Microphone icon to dictate them, or use the Quick Action Prompts.
2. **Visual Tools:** Utilize the Child Icon for the Body Map or the Thermometer for the pain scale.
3. **Review History:** View recent activity saved locally in your browser from the History tab.
4. **Interact:** Receive structured educational health information from the server-side AI proxy. For urgent warning signs, contact local emergency services or a qualified clinician.

---

## 🤝 Contributing

Contributions, issues, and feature requests are highly appreciated! Feel free to check out the [issues page](https://github.com/Ritik0102-bit/Vitalis-AI/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ✍️ Author

**Ritik Rana**
* GitHub: [@Ritik0102-bit](https://github.com/Ritik0102-bit)

---
<div align="center">
  <sub>Built with ❤️ by Ritik Rana</sub>
</div>
