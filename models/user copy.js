const   mongoose                = require("mongoose"),
        passportLocalMongoose   = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
    {
        // Bij aanmaken account:
        // role         = user
        // isActive     = true
        // -----------------------------
        // Beschikbare rollen:
        // admin        = mag overal bij
        // special      = mag bij uitgebreide menu's
        // user        = basis functionaliteit
        username: String,
        password: String,
        email: String,
        isActive: Boolean,
        role: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        description: String
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);