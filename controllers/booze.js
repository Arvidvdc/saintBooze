// Required dependencies
const   BOOZE  = require("../models/boozeIndex");

// Index controller
exports.index = (req,res) => {
    BOOZE.find()
        .then((foundAllBooze) => {
            let foundTotal = [];
            foundAllBooze.forEach(bottle => {
                if(bottle.name) {
                    foundTotal.push(bottle.name);
                }
            });
            res.send(foundTotal);
        })
        .catch((error) => {
            console.error("Error creating foundAllBooze:", error);
            res.send("Fout bij het ophalen van records: " + "\n" + error);
        });
    };

    // Create controller
exports.add = (req,res) => {
    let newBooze = {
        name                : req.body.name,
        series              : req.body.series,
        contents            : req.body.contents,
        category            : req.body.category,
        subcategory         : req.body.subcategory,
        aged                : req.body.aged,
        distillery          : req.body.distillery,
        distilleryWebsite   : req.body.distilleryWebsite,
        origin              : req.body.origin,
        region              : req.body.region,
        continent           : req.body.continent,
        alcohol             : req.body.alcohol,
        image               : req.body.image,
        nose                : req.body.nose,
        taste               : req.body.taste,
        stBoozeNose         : req.body.stBoozeNose,
        stBoozeTaste        : req.body.stBoozeTaste,
        stBoozeRating       : req.body.stBoozeRating,
        stBoozeDayAfter     : req.body.stBoozeDayAfter,
        dateAdded           : Date.now(),
        dateModified        : Date.now()
    }

    BOOZE.create(newBooze)
    .then((createdBOOZE) => {
        console.log("Booze created:", createdBOOZE);
        res.redirect("");
    })
    .catch((error) => {
        console.error("Error creating createdBOOZE:", error);
        res.send("Fout bij het opslaan van: " + req.body.name + "\n" + error);
    });

}

// New controller
exports.new = (req,res) => {
    res.render("./booze/new", { page: "boozeNew" });
}