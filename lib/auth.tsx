// lib/auth.js
import bcrypt from "bcrypt";
const getConnection = require("./config/connection");

export async function checkCredentials(email, password) {
  try {
    console.log("you are in auth");
    const connection = await getConnection();
    const users = await connection.execute(
      "SELECT * FROM user WHERE email=(?)",
      [email]
    );
    const user = users[0][0];
    console.log(user);
    if (!user) return false;

    const valid = email === user.email && password === user.password;
    console.log(valid, "valid");
    return valid;
  } catch (error) {
    console.error("Error checking credentials:", error);
    throw error;
  }
}

// export async function createUser(email, password) {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = { email, password: hashedPassword };

//   users.push(user);
//   return user;
// }
export async function createUser(email, password) {
  const connection = await getConnection();
  console.log("connection status");
  try {
    console.log("before insert");
    const [rows] = await connection.execute(
      "INSERT INTO user (email,password) VALUES (?,?)",
      [email, password]
    );
    console.log("after insert");
    return rows;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}
