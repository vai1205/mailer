const { check } = require("express-validator");
exports.contactFormValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is Required"),
    check("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    check("phone")
        .not()
        .isEmpty()
        .withMessage("Phone number is Required")
];

