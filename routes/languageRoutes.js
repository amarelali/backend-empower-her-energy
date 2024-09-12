const express = require("express");
const router = express.Router();
const { createLanguage , deleteLanguage, editLanguage} = require("../controllers/languageController");
router.route("/language").post(createLanguage);
router.route("/language/:id").delete(deleteLanguage);
router.route("/language/:id").patch(editLanguage);

module.exports = router;
