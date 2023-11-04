// Require dependencies
const   express             = require("express"),
        router              = express.Router(),
        index_controller    = require("../controllers/index");

// home route
router.get("/", index_controller.home);

// Export router
module.exports = router;