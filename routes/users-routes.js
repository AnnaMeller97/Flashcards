const express = require("express");

// const userController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "Simply message" });
});

module.exports = router;
