const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(res.status(400).json({ message: "Invalid input data" }));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(res.status(500).json({ message: "Signing up failed." }));
  }

  if (existingUser) {
    return next(
      res
        .status(409)
        .json({ message: "Account with provided email already exist." })
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return next(res.status(500).json({ message: "Signing up failed." }));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    flashcards: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(res.status(500).json({ message: "Signing up failed." }));
  }

  let token;
  try {
    token = jwt.sign(
      { id: createdUser.id, email: createdUser.email },
      `${process.env.JWT_PRIVATE_KEY}`,
      { expiresIn: "3h" }
    );
  } catch (error) {
    return next(res.status(500).json({ message: "Signing up failed." }));
  }

  res.status(201).json({
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
    token: token,
  });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(res.status(500).json({ message: "Logging in failed." }));
  }

  if (!existingUser) {
    return next(
      res
        .status(403)
        .json({ message: "Invalid credentials, logging in failed." })
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(res.status(500).json({ message: "Logging in failed." }));
  }

  if (!isValidPassword) {
    return next(
      res
        .status(403)
        .json({ message: "Invalid credentials, logging in failed." })
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
      `${process.env.JWT_PRIVATE_KEY}`,
      { expiresIn: "3h" }
    );
  } catch (error) {
    return next(res.status(500).json({ message: "Logging in failed." }));
  }

  res
    .status(200)
    .json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      token: token,
    });
};

exports.signUp = signUp;
exports.login = login;
