// Required dependencies
const   Booze  = require("../models/boozeIndex");

// New controller
exports.new = (req,res) => {
    res.render("./booze/new", { page: "boozeNew" });
}