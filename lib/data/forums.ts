// import { getConnection } from "../config/connection";

const getConnection = require("../config/connection");

async function getFroums() {
  let connection;
  try {
    connection = await getConnection();
    console.log("you are in data/forums.ts");
    const [rows] = await connection.execute("SELECT * FROM forum");
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error fetching forums:", error);
    throw error; // re-throw the error so it can be handled by the caller
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getFroums;
