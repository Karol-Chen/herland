const getConnection = require("../config/connection");
// import {getConnection} from "../config/connection";

console.log("you are in data/users.ts");

async function getUsers() {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute("SELECT * FROM user");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function addUser({ email, password }) {
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

module.exports = { getUsers, addUser };
