// Require dependencies
const   express             = require("express"),
        router              = express.Router(),
        booze_controller    = require("../controllers/booze");

// Index route
router.get("/", booze_controller.index);

// New route
router.get("/new", booze_controller.new);

// Create route
router.post("/new", booze_controller.add);

// Export router
module.exports = router;