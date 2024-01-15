// Required dependencies
const   MAINTENANCE     = require("../models/maintenance"),
        SARgE           = require("../SARgEModules/maintenance");

// Index controller
exports.index = (req,res) => {
    let continent   = SARgE.category(res.items, "continent"),
        category    = SARgE.category(res.items, "category"),
        subcategory = SARgE.category(res.items, "subcategory");
    
    res.render("./maintenance/index", {page: "maintenance", continent: continent, category: category, subcategory: subcategory });
}

// Create controller
exports.add = (req,res) => {
    let newMaintenance = {
        item        : req.body.item,
        english     : req.body.english,
        category    : req.body.category,
        description : req.body.description,
        isActive    : true
    }
    let addMore = (req.body.addMore=="on") ? (true) : (false);
    
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