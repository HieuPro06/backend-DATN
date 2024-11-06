const bodyParser = require("body-parser");
const cors = require("cors");
const DashboardRouter = require('./route/dashboard-route');
const express = require("express");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.json('Backend home');
})
app.use('/dashboard', DashboardRouter);

app.listen(port,(req,res) => {
    console.log(`Backend is running at http://localhost:${port}`);
})