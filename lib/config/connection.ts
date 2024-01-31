const mysql = require("mysql2/promise");
// const nextConfig = require("../../next.config");

let connection;
console.log("test");

async function connectToDb() {
  try {
    console.log("Connecting to database...");
    connection = await mysql.createPool({
      connectionLimit: 100,
      host: process.env.DB_HOST,
      // port: nextConfig.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Connected to database!");
    return connection;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}

module.exports = connectToDb;
