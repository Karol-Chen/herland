// import { getConnection } from "../config/connection";

const getConnection = require("../config/connection");

async function getForums() {
  let connection;
  try {
    connection = await getConnection();
    console.log("you are in data/forums.ts");
    const [rows] = await connection.execute("SELECT * FROM forum");
    return rows;
  } catch (error) {
    console.error("Error fetching forums:", error);
    throw error;
  }
}

module.exports = getForums;
