# Sales Leaderboard System(Internship Task)

A robust backend system designed to aggregate sales data and generate a real-time leaderboard. Built with Node.js, Express, and PostgreSQL, this project ranks sales agents based on their performance using professional tie-breaking logic.

## 🚀 Live Demo
**View the Leaderboard:** [https://sales-leaderboard-8i20.onrender.com/leaderboard](https://sales-leaderboard-8i20.onrender.com/leaderboard)

---

## 📋 Features Implemented

- **Data Persistence:** Uses a PostgreSQL (Neon) database to store sales records permanently.
- **Data Aggregation:** Automatically calculates total sales amount and total deals per agent using SQL grouping.
- **Positional Ranking:** - Dynamic 🥇, 🥈, and 🥉 emoji rewards for the top 3 performers.
  - CSS highlighting for the #1 ranked agent.
- **Consistent Tie-Breaking:** If two agents have equal sales, the system ranks them by:
  1. Total number of deals (Efficiency).
  2. Alphabetical order (Name) to ensure a stable leaderboard.
- **SSR (Server-Side Rendering):** Fast page loads using the EJS template engine.
- **Security:** Implements Environment Variables (`.env`).

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Neon Cloud)
- **Frontend/Templating:** EJS (Embedded JavaScript), Bootstrap 5
- **Deployment:** Render (Web Service)

---

## 📡 API Endpoints

### 1. Add Sales Record
- **URL:** `/api/sales`
- **Method:** `POST`
- **Body:**
```json
{
  "agent_name": "John Doe",
  "amount": 5000,
  "deals": 2
}
