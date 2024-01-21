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

// Edit controler
exports.edit = (req,res)  => {
    let continent       = SARgE.category(res.items, "continent"),
        category        = SARgE.category(res.items, "category"),
        subcategory     = SARgE.category(res.items, "subcategory");

    MAINTENANCE.findById(req.params.id)
    .then((foundData) => {
        console.log("Maintenance found for edit: ", foundData);
        res.render("./maintenance/edit", {page: "maintenanceEdit",foundData: foundData, continent: continent, category: category, subcategory: subcategory });
    })
    .catch((error) => {
        console.log("Error finding record for edit:", error);
        res.send("Fout bij het ophalen van: " + req.params.id + "\n" + error);
    })
}

exports.update = (req,res) => {
    let updateMaintenance = {};
    switch (req.query.u) {
        case "active":
            updateMaintenance.isActive = req.body.isActive;
            break;
        case "complete":
            updateMaintenance.item        = req.body.item;
            updateMaintenance.english     = req.body.english;
            updateMaintenance.description = req.body.description;
            break;
        default:
            console.log("NOT FOUND: '" + req.query.u + "'.");
    }
    
    MAINTENANCE.findByIdAndUpdate(req.params.id, updateMaintenance)
    .then((updatedItem) => {
        console.log("updated: " + updatedItem);
        res.redirect("/maintenance");
    })
    .catch((error) => {
        console.log("Error during update: ",error);
        res.send("Fout bij het bijwerken van: " + req.params.id + "\n" + error);
    })
}

// Destroy controler
exports.delete = (req,res) => {
    MAINTENANCE.findByIdAndDelete(req.params.id)
    .then((deletedItem) => {
        console.log("deleted: " + deletedItem);
        res.redirect("/maintenance");
    })
    .catch((error) =>{
        console.log(error);
        res.send("Fout bij het verwokderem van: " + req.params.id + "\n" + error);
    })
}