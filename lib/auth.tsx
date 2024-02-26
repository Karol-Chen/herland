// lib/auth.js
import bcrypt from "bcrypt";
import checkEmailFormat from "../helper";
const getConnection = require("./config/connection");

export async function checkCredentials(email, password) {
  try {
    if (!email || !password) throw new Error("Email or password is missing");
    if (password.length < 8)
      throw new Error("Password should be at least 8 characters long");
    if (!checkEmailFormat(email))
      throw new Error("Please enter a valid email address.");
    const connection = await getConnection();
    const users = await connection.execute(
      "SELECT * FROM wp_users WHERE user_login=(?)",
      [email]
    );
    const user = users[0][0];
    console.log(user);
    if (!user) return false;
    const valid = await bcrypt.compare(password, user.user_pass);
    console.log(valid, "valid");
    return valid;
  } catch (error) {
    console.error("Error checking credentials:", error);
    throw error;
  }
}

export async function createUser(
  email: String,
  password: String,
  invtCode: String
) {
  try {
    const connection = await getConnection();
    console.log("connection status");
    console.log("before insert");
    if (!invtCode) {
      console.log("invtCode is missing");
      throw new Error("Please enter the invitation code.");
    }
    if (!email || !password) {
      console.log("Email or password is missing");
      throw new Error("Email or password is missing");
    }
    if (password.length < 8) {
      console.log(password, "password", password.length, "password.length");
      console.log("auth: Password should be at least 8 characters long");
      throw new Error("Password should be at least 8 characters long");
    }
    if (!checkEmailFormat(email)) {
      console.log("Email format is not correct");
      throw new Error("Please enter a valid email address.");
    }

    const ifExists = await checkEmail(email);
    console.log("ifExists", ifExists);
    if (ifExists) {
      console.log("Email already exists");
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await connection.execute(
      "INSERT INTO wp_users (user_login,user_pass,user_nicename,user_email,user_url,user_activation_key,user_status,display_name) VALUES (?,?,?,?,?,?,?,?)",
      [email, hashedPassword, email, email, "", invtCode, 0, email]
    );
    console.log("after insert");
    return rows;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

export async function checkEmail(email) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM wp_users WHERE user_login=(?)",
      [email]
    );
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error checking email:", error);
    throw error;
  }
}
