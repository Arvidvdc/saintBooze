const   BOOZE   = require("../models/boozeIndex");

exports.category = (collection, category) => {
    let categoryItems = [];
    collection.forEach(record => {
        if (record.category===category) {
            categoryItems.push(record);
        }
    });
    return categoryItems;
}

exports.countries = () => {
   BOOZE.distinct("origin")
    .then((countries) => {
        console.log(countries);
        return;
    })
    .catch((error) => {
        console.error("Error distinct:", error);
        throw error
    })
    console.log("Na");
}