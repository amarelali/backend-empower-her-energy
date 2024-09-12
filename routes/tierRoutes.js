const express = require("express");
const router = express.Router();
const { createTier , deleteTier} = require("../controllers/tierController");
router.route("/tier").post(createTier);
router.route("/tier/:id").delete(deleteTier);

module.exports = router;
