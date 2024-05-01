const db = require("../db/db");
const bcrypt = require("bcrypt");
const checkEmailFormat = require("../helper.js/email.helper");

require("dotenv").config();
const salt = parseInt(process.env.SALT);

const authResolvers = {
  signup: async ({ username, email, password }) => {
    try {
      const hashedPass = await bcrypt.hash(password, salt);

      if (!checkEmailFormat(email)) {
        return { status: "error", message: "email are not in email format" };
      }

      const check = await db.query("SELECT COUNT(*) as count FROM user WHERE email = ?", [email]);

      if (check[0].count > 0) {
        return { status: "error", message: "email existed" };
      }

      await db.query("INSERT INTO user (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPass]);

      return { status: "success", message: "User signed up successfully" };
    } catch (error) {
      console.error("Error signing up: ", error);
      throw new Error("An error occured when signing up.");
    }
  },
  signin: async ({ email, password }) => {
    try {
      const [user] = await db.query("SELECT email, password FROM user WHERE email = ?", [email]);
      if (!user) {
        return { status: "unauthorized", message: "User not found" };
      }

      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return { status: "unauthorized", message: "Wrong credentials" };
      }

      return {
        status: "success",
        message: "Signing in successfully",
      };
    } catch (error) {
      console.error("Error signing in: ", error);
      throw new Error("An error occured when signing in.");
    }
  },
};

module.exports = authResolvers;
