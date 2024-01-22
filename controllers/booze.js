// Required dependencies
const   BOOZE           = require("../models/boozeIndex"),
        SARgE           = require("../SARgEModules/maintenance"),
        fs              = require("fs");

let moment = require("moment"); //code voor opmaak datum
const { utc, now } = require("moment");

// Index controller
exports.index = (req,res) => {
    BOOZE.find()
        .then((foundAllBooze) => {
            console.log(foundAllBooze);
            let path        = "./public/flagCentral",
                folderList  = [],
                fileList    = [];
            
            fs.readdir(path, (err,collection) => {
                if(!err) {
                    collection.forEach(file => {
                        let stats = fs.statSync(path + "/" + file);
                        if(stats.isFile()) {
                            fileList.push(file);
                        } else if(stats.isDirectory()) {
                            folderList.push(file);
                        } else {
                            throw err;
                        }
                    });
                    res.render("./booze/index", { page: "boozeIndex", countrylist: fileList, moment: moment, boozeData: foundAllBooze });
                }
            });
        })
        .catch((error) => {
            console.error("Error creating foundAllBooze:", error);
            res.send("Fout bij het ophalen van records: " + "\n" + error);
        });
}

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
        continent           : req.body.english,
        alcohol             : req.body.alcohol,
        image               : req.body.image,
        image               : (req.body.image=="") ? ("/boozeImages/stripes.png") : (req.body.image),
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
        res.redirect("/booze");
    })
    .catch((error) => {
        console.error("Error creating createdBOOZE:", error);
        res.send("Fout bij het opslaan van: " + req.body.name + "\n" + error);
    });

}

// New controller
exports.new = (req,res) => {
    let continent   = SARgE.category(res.items, "continent"),
        category    = SARgE.category(res.items, "category"),
        subcategory = SARgE.category(res.items, "subcategory"),
        path        = "./public/flagCentral",
        folderList  = [],
        fileList    = [];

        fs.readdir(path, (err,collection) => {
            if(!err) {
                collection.forEach(file => {
                    let stats = fs.statSync(path + "/" + file);
                    if(stats.isFile()) {
                        fileList.push(file);
                    } else if(stats.isDirectory()) {
                        folderList.push(file);
                    } else {
                        throw err;
                    }
                });
                res.render("./booze/new", { page: "boozeNew", continent: continent, countrylist: fileList, category: category, subcategory: subcategory });
            }
        });
}