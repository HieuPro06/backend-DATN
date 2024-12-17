const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;
// const admin = require("firebase-admin");
// const serviceAccount = require("./datn-628d9-firebase-adminsdk-xvurg-39c741a657.json");
// /* Khởi tạo Firebase-admin */
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// const sendNotification = async (registrationToken) => {
//   const messageSend = {
//     token: registrationToken,
//     notification: {
//       title: "Hello",
//       body: "World"
//     },
//     data: {
//       key1: "value1",
//       key2: "value2"
//     },
//     android: {
//       priority: "high"
//     },
//     apns: {
//       payload: {
//         aps: {
//           badge: 42
//         }
//       }
//     }
//   }
// }
// admin
//     .messaging()
//     .send(messageSend)
//     .then(response => {
//       console.log("Successfully sent message: ", response);
//     })
//     .catch(error => {
//       console.error("Error sending message : ", error);
//     })
// const registrationToken = "";
// sendNotification(registrationToken);

const DoctorRouter = require("./route/doctor.routes.js");
const SignUpRouter = require("./route/signup.route");
const LoginRouter = require("./route/login.route");
const DoctorProfileRouter = require("./route/doctor-profile.router");
const SpecialityRouter = require("./route/speciality.route");
const RoomRouter = require("./route/room.route");
const ServiceRouter = require("./route/service.route");
const PatientRouter = require("./route/patient.route");
const BookingRouter = require("./route/booking.route");
const AppointmentRecordRouter = require("./route/appointment-record.route");
const TreatmentRouter = require("./route/treatment.route");
const AppointmentRouter = require("./route/appointment.routes");
const DrugRouter = require("./route/drug.routes");
const DoctorServiceRouter = require("./route/doctorAndService.routes.js");
const DoctorServiceReadyRouter = require("./route/doctorAndServiceReady.routes.js");
const PatientProfileRouter = require("./route/patient-profile.route");
const BookingPhotosRouter = require("./route/booking-photos.routes.js");
const BookingPhotoRouter = require("./route/booking-photo.routes.js");
const DashboardRouter = require("./route/dashboard.route");
const NotificationsRouter = require("./route/notifications.route.js");
const {response} = require("express");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("avatar"));
app.get("/", (req, res) => {
  res.json("Backend home");
});

app.use("/dashboard", DashboardRouter);
app.use("/api/doctors", DoctorRouter);
app.use("/api/signup", SignUpRouter);
app.use("/api/login", LoginRouter);
app.use("/api/doctor/profile", DoctorProfileRouter);
app.use("/api/patient/profile", PatientProfileRouter);
app.use("/api/specialities", SpecialityRouter);
app.use("/api/rooms", RoomRouter);
app.use("/api/services", ServiceRouter);
app.use("/api/patients/", PatientRouter);
app.use("/api/patient/booking", BookingRouter);
app.use("/api/appointment-records", AppointmentRecordRouter);
app.use("/api/treatments", TreatmentRouter);
app.use("/api/appointment", AppointmentRouter);
app.use("/api/drug", DrugRouter);
app.use("/api/doctors-and-services", DoctorServiceRouter);
app.use("/api/doctors-and-services-ready", DoctorServiceReadyRouter);
app.use("/api/booking/photos", BookingPhotosRouter);
app.use("/api/booking/photo", BookingPhotoRouter);
app.use("/api/patient/notifications", NotificationsRouter);

app.listen(port, (req, res) => {
  console.log(`Backend is running at http://localhost:${port}`);
});
