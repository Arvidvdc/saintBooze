// Require dependencies
const   express                 = require("express"),
        router                  = express.Router(),
        booze_controller        = require("../controllers/booze"),
        middleware_booze        = require("../middleware/booze");

// Index route
router.get("/", booze_controller.index);

// New route
router.get("/new", middleware_booze.items(), booze_controller.new);

// Create route
router.post("/new", booze_controller.add);

// Export router
module.exports = router;