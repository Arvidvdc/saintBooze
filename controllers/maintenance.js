// Required dependencies
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
    let addMore = (req.body.addMore=="on") ? (true) : (false);
    console.log(addMore);
    MAINTENANCE.create(newMaintenance)
    .then((createdMaintenance) => {
        console.log("Maintenance created: ", createdMaintenance);
        if(addMore){
            res.redirect("/maintenance/new");
        } else {
            res.redirect("/maintenance");
        }
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