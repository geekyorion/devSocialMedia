const express = require("express");
const router = express.Router();

/**
 * @route               GET api/posts/test
 * @description         test posts route
 * @access              public
 */
router.get("/test", (req, res) => {
    res.json({ message: "Posts test API" });
});

module.exports = router;