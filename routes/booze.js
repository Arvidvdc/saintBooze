// Require dependencies
const   express                 = require("express"),
        router                  = express.Router(),
        booze_controller        = require("../controllers/booze"),
        maintenance_middleware  = require("../middleware/maintenance");

// Index route
router.get("/", booze_controller.index);

// New route
router.get("/new", maintenance_middleware.items(), booze_controller.new);

// Create route
router.post("/new", booze_controller.add);

// Export router
module.exports = router;