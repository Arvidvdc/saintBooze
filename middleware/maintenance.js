// Required dependencies
const MAINTENANCE = require("../models/maintenance");

exports.items = () => {
    return (req, res, next) => {
        MAINTENANCE.find()
        .sort({ item: 1 })
        .then((foundMaintenaince) => {
            res.items = foundMaintenaince;
                next();
        })
        .catch((error) => {
            console.log("maintenance - Something went wrong: \n" + error);
        })
    }
}