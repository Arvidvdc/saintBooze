// Require dependencies
const   express             = require("express"),
        router              = express.Router(),
        booze_controller    = require("../controllers/booze");

// New route
router.get("/new", booze_controller.new);

// Export router
module.exports = router;