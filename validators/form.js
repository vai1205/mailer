const { check } = require("express-validator");
exports.contactFormValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is Required"),
    check("qualification")
        .not()
        .isEmpty()
        .withMessage("Qualification is Required"),
    check("affiliation")
        .not()
        .isEmpty()
        .withMessage("Affiliation is Required"),
    check("designation")
        .not()
        .isEmpty()
        .withMessage("Designation is Required"),
    check("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    check("phone")
        .not()
        .isEmpty()
        .withMessage("Phone number is Required")
];

