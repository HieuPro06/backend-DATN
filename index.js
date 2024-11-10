const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;
const DoctorRouter = require("./routes/doctor.routes.js");
const SignUpRouter = require("./routes/signup.route");
const LoginRouter = require("./routes/login.route");
const DoctorProfileRouter = require("./routes/doctor-profile.router");
const SpecialityRouter = require("./routes/speciality.route");
const RoomRouter = require("./routes/room.route");
const ServiceRouter = require("./routes/service.route");
const PatientRouter = require("./routes/patient.route");
const BookingRouter = require("./routes/booking.route");
const AppointmentRouter = require("./routes/appointment.routes");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Backend home");
});

app.use("/api/doctors", DoctorRouter);
app.use("/api/signup", SignUpRouter);
app.use("/api/login", LoginRouter);
app.use("/api/doctor/profile", DoctorProfileRouter);
app.use("/api/specialites", SpecialityRouter);
app.use("/api/rooms", RoomRouter);
app.use("/api/services", ServiceRouter);
app.use("/api/patients/", PatientRouter);
app.use("/api/patient/booking", BookingRouter);
app.use("/api/appointment", AppointmentRouter);

app.listen(port, (req, res) => {
  console.log(`Backend is running at http://localhost:${port}`);
});
