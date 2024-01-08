const   User            = require("../models/user"),
        middlewareObj   = {};

middlewareObj.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Hiervoor is inloggen verplicht.");
        res.redirect("/user/login");
    };
};

middlewareObj.isActive = (req,res,next) => {
    if(req.isAuthenticated()) {
        let testUser= req.user.isActive;
        if(testUser) {
            return next();
        } else {
            req.flash("error", "Uw account is nog niet geactiveerd.");
            res.redirect("/");
        }
    } else {
        req.flash("error", "Hiervoor is inloggen verplicht.");
        res.redirect("/user/login");
    }
}

middlewareObj.isSpecial = (req,res,next) => {
    if(req.isAuthenticated()) {
        let testUser= req.user.role;
        let regex = RegExp('special');
        if(regex.test(testUser)) {
            return next();
        } else {
            console.log("middlewareObj.isSpecial: Ingelogde gebruiker heeft geen rechten.");
            req.flash("error", "Hiervoor is zijn speciale rechten nodig.");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Hiervoor is zijn speciale rechten nodig.");
        res.redirect("/user/login");
    }
}

middlewareObj.isAdmin = (req,res,next) => {
    if(req.isAuthenticated()) {
        let testUser= req.user.role;
        let regex = RegExp('admin');
        if(regex.test(testUser)) {
            return next();
        } else {
            console.log("middlewareObj.isAdmin: Ingelogde gebruiker heeft geen rechten.");
            req.flash("error", "Hiervoor is admin zijn verplicht.");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Hiervoor is admin zijn verplicht.");
        res.redirect("/user/login");
    }
}

module.exports = middlewareObj;