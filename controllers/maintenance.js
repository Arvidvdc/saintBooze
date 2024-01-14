// Required dependencies
const maintenance = require("../models/Maintenance");
const   MAINTENANCE  = require("../models/Maintenance");

// Index controller
exports.index = (req,res) => {
    res.send("MAINTENANCE INDEX");
}

// Create controller
exports.add = (req,res) => {
    let newMaintenance = {
        item        : req.body.item,
        category    : req.body.category,
        description : req.body.description,
        isActive    : true
    }
    MAINTENANCE.create(newMaintenance)
    .then((createdMaintenance) => {
        console.log("Maintenance created: ", createdMaintenance);
        res.redirect("/maintenance");
    })
    .catch((error) => {
        console.log("Error creating maintenance:", error);
        res.send("Fout bij het opslaan van: " + req.body.item + "\n" + error);
    });
}

// New controller
exports.new = (req,res) => {
    res.render("./maintenance/new", { page: "maintenanceNew" });
}