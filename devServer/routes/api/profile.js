const express = require("express");
const router = express.Router();

/**
 * @route               GET api/profile/test
 * @description         test profile route
 * @access              public
 */
router.get("/test", (req, res) => {
    res.json({ message: "Profile test API" });
});

module.exports = router;