const express = require('express');
const app = express();
const { connectDatabase } = require('./persistence');

connectDatabase();

app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Backend is running');
});


app.get('/test', (req, res) => {
    res.json({ status: "ok" });
});

//handlers
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


//ports
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});