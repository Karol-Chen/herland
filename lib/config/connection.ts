const mysql = require("mysql2/promise");

let pool;
let count: number = 0;

async function connectToDb() {
  if (pool) return pool; // If the pool already exists, return it

  try {
    console.log("Connecting to database...");
    pool = await mysql.createPool({
      connectionLimit: 151,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(
      "Connected to database! The count is: ",
      count,
      " and the pool is: ",
      pool
    );
    count++;
    return pool;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}

module.exports = connectToDb;
