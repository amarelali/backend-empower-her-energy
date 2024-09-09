const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.route("/user").post(userController.register);
module.exports = router;
