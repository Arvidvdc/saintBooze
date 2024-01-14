// Require dependencies
const   express                   = require("express"),
        router                    = express.Router(),
        maintenance_controller    = require("../controllers/maintenance"),
        maintenance_middleware    = require("../middleware/maintenance");

// Index route
router.get("/", maintenance_middleware.items(), maintenance_controller.index);

// Create route
router.post("/new", maintenance_controller.add);

// New route
router.get("/new", maintenance_controller.new);

// Export router
module.exports = router;