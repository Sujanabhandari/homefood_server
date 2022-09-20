
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../database/client");
const bcrypt = require("bcrypt");
const path = require("path");

const publicFilesPath = path.join(__dirname, "../", "public");
const protectedFilesPath = path.join(__dirname, "../", "protected");

const create_login_user = async(req, res, next) => {
   
const { username, password } = req.body;
  const { FAKE_USERNAME, FAKE_PASSWORD } = process.env;

  if (username === FAKE_USERNAME && password === FAKE_PASSWORD) {
    const payload = { username, admin: true };
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    res
      .set("x-authorization-token", token)
      .sendFile(path.join(__dirname, "../", "public/checkToken.html"));
  } else {
    res.redirect("/");
  }

};

module.exports = { create_login_user };