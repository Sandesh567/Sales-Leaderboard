require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true,
    },
});

pool.connect((err) => {
    if (err) {
        console.error("Database Connection error:", err.stack);
    }
    else {
        console.log('Connected to PostgreSQL Successfully');
    }
});

app.post('/api/sales', async (req, res) => {
    const { agent_name, amount, deals } = req.body;

    if (!agent_name || !amount || !deals) {
        return res.status(400).json({ error: "Please provide agent_name, amount and deals." });
    }

    try {
        const query = 'INSERT INTO sales(agent_name, amount, deals) VALUES($1, $2, $3) RETURNING *';
        const values = [agent_name, amount, deals];

        const result = await pool.query(query, values);
        res.status(201).json({ message: "SAles Recorded!", data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/api/leaderboard', async (req, res) => {
    try {
        const query = `
            SELECT
                agent_name,
                SUM(amount) as total_sales,
                SUM(deals) as total_deals
            FROM sales
            GROUP BY agent_name
            ORDER BY total_sales DESC, total_deals DESC;
        `;

        const result = await pool.query(query);

        const leaderboard = result.rows.map((row, index) => {
            return {
                rank: index + 1,
                name: row.agent_name,
                totalSales: parseFloat(row.total_sales),
                totalDeals: parseInt(row.total_deals)
            };
        });
        res.json(leaderboard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started running on PORT ${PORT}`);
});