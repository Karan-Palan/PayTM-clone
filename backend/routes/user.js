const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  fName: zod.string(),
  lName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  // Logic for user existing
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Email already used/ Incorrect input",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "Email already used/ Incorrect input",
    });
  }
  // To create user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    fName: req.body.fName,
    lName: req.body.lName,
  });
  const userId = user._id;
  // Creating token
  const token = jwt.sign(
    {
      userId,
    },
    jwtSecret
  );
  res.json({
    msg: "User created sucessfully",
    token: token,
  });
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
router.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      msg: "incorrect input",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

module.exports(router);
