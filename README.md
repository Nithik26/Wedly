# 💍 WEDLY – AI-Powered Indian Wedding Planner  

> *Plan your dream wedding effortlessly — from themes and venues to tasks and budgets.*  
> **WEDLY** helps couples organize their big day with AI-driven recommendations, personalized checklists, and complete event management tools.  

---

## 🌸 Features  

- 💑 **Wedding Details Manager** — Save and update all key wedding info (partners, venue, theme, date, etc.)  
- ✅ **Smart Checklist** — Add, track, and manage tasks, automatically saved to your profile  
- 🤖 **AI Wedding Assistant** — Powered by **Google Gemini API** for personalized ideas, themes & itineraries  
- 💌 **Contact Form** — Stores user messages securely in MongoDB  
- 🔐 **Authentication System** — Secure login & signup using JWT  
- 🧠 **User Dashboard** — Intuitive layout with sections for Details, AI Assistant, and Checklist  
- 🎨 **Modern UI** — Responsive React + Tailwind CSS interface  

---

## ⚙️ Tech Stack  

| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **AI Integration** | Google Gemini API |
| **Authentication** | JWT-based Auth |

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
git clone https://github.com/your-username/Wedly.git
cd Wedly

2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file inside /backend and add:

ini
Copy code

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

GEMINI_API_KEY=your_gemini_api_key

PORT=5000

Start the backend:

Copy code
npm run dev

3️⃣ Frontend Setup


Copy code

cd ../frontend

npm install

npm start

Frontend runs on 👉 http://localhost:3000

Backend runs on 👉 http://localhost:5000

💡 Future Enhancements
🪷 AI-Generated Budget Planner & Day-wise Itinerary for Indian Weddings

🧾 Expense Tracking Dashboard

📸 Vendor and Photographer Recommendations

📱 Mobile-first PWA version

🤝 Contributing
We welcome contributions!
If you’d like to fix bugs or add new features:

Fork this repository

Create a new branch (git checkout -b feature-name)

Commit your changes

Open a Pull Request
