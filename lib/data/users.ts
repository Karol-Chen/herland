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
  } finally {
    if (connection) connection.release();
  }
}

async function addUser({ username, email, password }) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(
      "INSERT INTO user (username,email,invt_code,password) VALUES (?,?,?,?)",
      [username, email, password]
    );
    return rows;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

module.exports = { getUsers, addUser };
