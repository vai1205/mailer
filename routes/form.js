const express = require("express");
const router = express.Router();
const { contactFormValidator } = require("../validators/form");
const { runValidation } = require("../validators/index");
const { contactForm } = require("../controllers/form");

router.post("/contact", contactFormValidator, runValidation, contactForm);

module.exports = router;
