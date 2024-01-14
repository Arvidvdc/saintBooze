// Required dependencies
const   MAINTENANCE  = require("../models/Maintenance");

// Index controller
exports.index = (req,res) => {
    res.send("MAINTENANCE INDEX");
}

// Create controller
exports.add = (req,res) => {
    res.send("MAINTENANCE CREATE");
}

// New controller
exports.new = (req,res) => {
    res.render("./maintenance/new", { page: "maintenanceNew" });
}