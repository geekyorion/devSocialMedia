const express = require("express");
const router = express.Router();

/**
 * @route               GET api/user/test
 * @description         test user route
 * @access              public
 */
router.get("/test", (req, res) => {
    res.json({ message: "User test API" });
});

module.exports = router;