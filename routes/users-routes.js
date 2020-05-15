const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/users-controller");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  userController.signUp
);

module.exports = router;
