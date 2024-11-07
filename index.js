const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;
const DoctorRouter = require("./route/doctor.routes.js");
const SignUpRouter = require("./route/signup.route");
const LoginRouter = require("./route/login.route");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Backend home");
});

app.use("/api/doctors", DoctorRouter);
app.use("/api/signup",SignUpRouter);
app.use("/api/login",LoginRouter);

app.listen(port, (req, res) => {
  console.log(`Backend is running at http://localhost:${port}`);
});
