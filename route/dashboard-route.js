const express = require('express');
const DashboardRouter = express.Router();
const dashboardControllers = require('../controllers/dashboard-controllers');

DashboardRouter.get('/',dashboardControllers);

module.exports = DashboardRouter;
