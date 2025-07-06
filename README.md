💸 Finance Tracker
A full-stack personal finance tracker that helps you manage budgets, transactions, categories, and track your analytics — built using Next.js, Node.js, and MongoDB.

🔗 Live Demo
Frontend: https://finance-tracker-frontend-rxcv.onrender.com/
Backend API: Hosted on Render 

🛠️ Tech Stack
Layer	Technology
Frontend	Next.js, Tailwind CSS, TypeScript
Backend	Express.js, Node.js
Database	MongoDB (via Mongoose)
Hosting	Render
API Comm	Axios

📁 Repositories
Frontend Repo: Finance-Tracker-frontend

Backend Repo: Finance-Tracker

✨ Features
✅ Add, view, and delete transactions

📊 Track spending by category and date

🧮 Visual analytics for income/expenses

📁 Budget management per month

🗃️ Category organization

⚡ Responsive and fast UI

⚙️ Getting Started
🔌 Backend Setup
Clone the backend repo:

bash
Copy
Edit
git clone https://github.com/NishantDwd/Finance-Tracker.git
cd Finance-Tracker
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
PORT=5000
Start the server:

bash
Copy
Edit
npm run dev
The backend will run at http://localhost:5000/api

🖥️ Frontend Setup
Clone the frontend repo:

bash
Copy
Edit
git clone https://github.com/NishantDwd/Finance-Tracker-frontend.git
cd Finance-Tracker-frontend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env.local file:

env
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Run the development server:

bash
Copy
Edit
npm run dev
Frontend will be available at http://localhost:3000

📌 Deployment
Frontend: Deployed on Render, connected to GitHub for auto-deploy.

Backend: Also hosted on Render with environment variables set securely.

