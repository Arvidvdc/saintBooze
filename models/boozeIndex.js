const   mongoose                = require("mongoose"),
        passportLocalMongoose   = require("passport-local-mongoose");

const BoozeSchema = new mongoose.Schema(
    {
        name                : String,
        series              : String,
        contents            : Number,
        category            : String,
        subcategory         : String,
        aged                : Number,
        distillery          : String,
        distilleryFounded   : Number,
        distilleryWebsite   : String,
        origin              : String,
        region              : String,
        continent           : String,
        alcohol             : Number,
        favorites           : {
            person:     String
        },
        favoritesExternal   : String,
        image               : {
            imagePath:  String,
            active:     Boolean
        },
        nose                : String,
        taste               : String,
        stBoozeNose         : String,
        stBoozeTaste        : String,
        stBoozeRating       : String,
        stBoozeDayAfter     : String,
        priceNL             : String,
        priceDE             : String,
        dateAdded           : {
            type:       Date,
            default:    Date.now
        },
        dateModified        : Date
    }
);

BoozeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Booze", BoozeSchema);