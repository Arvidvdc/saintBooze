// Required dependencies
const   passport    = require("passport"),
        User        = require("../models/user")
        async       = require("async"),
        nodemailer  = require("nodemailer"),
        crypto      = require("crypto");

// Register controlers
exports.register = (req,res)=> {
    res.render("./user/register", { page: "userRegister" });
}

exports.register_post = (req,res) => {
	async.waterfall([
		function (done) {
			let newUser = new User({username: req.body.username,email: req.body.email, role: "user", isActive: true});
			User.register(newUser, req.body.password , (err, user)=>{
				if(err) {
					req.flash("error", err.message); 
					res.redirect("./register");
				}
				passport.authenticate("local")(req,res, function(){
                    req.flash("success", "Welkom " + user.username + ". zodra je rechten toegekend zijn, kan je meer met je account.");
					done(err, user);
				});
			});
		},
	    function (user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: process.env.GMAILUSR,
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.email,
                bcc: process.env.GMAILADMIN,
				from: process.env.GMAILFROM + " <" + process.env.GMAILUSR + ">",
				subject: process.env.GMAILSUBJECTNEW,
				text: "Hallo " + user.username + ",\n\n" +
					"Welkom bij Firebase. Leuk dat jij je hebt aangemeld! Je account moet nog wel geactiveerd worden voordat je alle extra's kan benutten. Dit zal ongeveer 24 uur duren.\n" +
                    "De volgende gegevens zijn van je bekend:\n" +
					"Username: " + user.username + "\n" +
					"Password: " + req.body.password + "\n" +
					"E-mail  : " + user.email + "\n"
			};
			smtpTransport.sendMail(mailOptions, function (err) {
				done(err);
			});
		}
	], function (err) {
		res.redirect("/");
	});
}

// Login controllers
exports.login = (req,res) => {
    res.render("./user/login", { page: "userLogin" });
}

exports.login_post =  passport.authenticate("local", {
    successRedirect: "/", 
    failureRedirect: "/user/login",
    failureFlash: true,
    successFlash: 'Welkome, je bent ingelogd'
}), (req,res)=> {
}

// Logout controller
exports.logout = (req,res) => {
    req.logout((err) => {if(err) { return next(err);}});
    req.flash("success", "Je bent uitgelogd.");
    res.redirect("/");
}

// Forgot controller
exports.forot = (req,res) => {
    res.render("./user/forgot", { page: "userForget" });
}

exports.forot_post = (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString("hex");
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash("error", "Email niet gevonden.");
                    return res.redirect("/user/forgot");
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.GMAILUSR,
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: user.email,
                from: process.env.GMAILFROM + " <" + process.env.GMAILUSR + ">",
                subject: "Wachtwoord reset.",
                text: "Je ontvangt dit bericht omdat er een wachtwoord wijziging aangevraagd is voor je account.\n\n" +
                    "Klik op de volgende link, of copy/paste deze link in je browser om het proces te voltooien:\n\n" +
                    "http://" + req.headers.host + "/user/reset/" + token + "\n\n" +
                    "Als je niet om deze wijziging gevraagd hebt, hoef je niets te doen. Je wachtwoord zal niet veranderen.\n"
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log("mail sent");
                req.flash("success", "Mail gestuurd naar " + user.email + " met verdere instructies.");
                done(err, "done");
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect("/");
    });
}

// Reset controller
exports.reset = (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash("error", "Wachtwoord wijzigen is verlopen of niet geldig.");
            return res.redirect("/user/forgot");
        }
        res.render("./user/reset", { token: req.params.token, page: "userPWDReset" });
    });
}

exports.reset_post = (req, res) => {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash("error", "Wachtwoord wijzigen is verlopen of niet geldig.");
                    return res.redirect("back");
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function (err) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            req.logIn(user, function (err) {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    req.flash("error", "Wachtwoorden komen niet overeen.");
                    return res.redirect("back");
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.GMAILUSR,
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: user.email,
                from: process.env.GMAILFROM + " <" + process.env.GMAILUSR + ">",
                subject: "Je wachtwoord is gewijzigd",
                text: "Hello,\n\n" +
                    "Dit is de bevestiging dat je wachtwoord voor " + user.email + " is gewijzigd.\n"
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash("success", "Succes! je wachtwoord is gewijzigd.");
                done(err);
            });
        }
    ], function (err) {
        res.redirect("/");
    });
}

// Profile controller
exports.profile = (req,res) => {
    User.findById(req.user._id, (err,user)=>{
        if(err){
            console.log("user.findById: " + err);
        } else {
            res.render("./user/profile", { page: "userProfile", userData: user, page: ""});
        };
    });
    
}

// Admin controller
exports.admin = (req,res) => {
    User.find({ }, (err, foundUsers) => {
        if(err) {
            console.log("USERAdmin - Something went wrong: \n" + err.message);
            res.send("Er is een foutmelding ontstaan. Raadpleeg de beheerder.");
        } else {
            res.render("./user/admin", { data: foundUsers, page: "extramaintenanceUserAdmin" });
        }
    });
}

// Admin update controller
exports.adminUpdate = (req,res) => {
    let  updUser = {
        username    : req.body.username,
        email       : req.body.email,
        role        : req.body.role,
        description : req.body.description
    }
    updUser.isActive    = (req.body.isActive=="on") ? (true) : (false);

    User.findByIdAndUpdate(req.params.id, updUser, (err) => {
        if(err) {
            req.flash("error", "Fout bij het bijwerken!");
            res.redirect("back")
        } else {
            req.flash("success", "Wijziging opgeslagen.");
            res.redirect("back");
        }
    });
}

// Destroy controller
exports.delete = (req,res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            req.flash("error", "Fout bij het verwijderen!");
            res.redirect("back")
        } else {
            req.flash("success", "Gebruiker verwijderd.");
            res.redirect("/user/admin");
        }
    });
}