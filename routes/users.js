// Require dependencies
const   express             = require("express"), 
        router              = express.Router(),
        user_controller     = require("../controllers/users"),
        middleware          = require("../middleware/index");

// Register route
router.get("/register", user_controller.register);

router.post("/register", user_controller.register_post);

// Login routes
router.get("/login", user_controller.login);

router.post("/login", user_controller.login_post);

// Logout route
router.get("/logout", user_controller.logout);

// Forgot routes
router.get("/forgot", user_controller.forot);

router.post("/forgot", user_controller.forot_post);

// Reset routes
router.get("/reset/:token", user_controller.reset);

router.post("/reset/:token", user_controller.reset_post);

// Profile route
router.get("/profile", middleware.isActive, user_controller.profile);

// Admin route
router.get("/admin", middleware.isAdmin, user_controller.admin);

// Admin update route
router.put("/admin/:id", middleware.isAdmin, user_controller.adminUpdate);

// Destroy route
router.delete("/admin/:id", middleware.isAdmin, user_controller.delete);

// Export router
module.exports = router;