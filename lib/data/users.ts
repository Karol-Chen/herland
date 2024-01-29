const getConnection = require("../config/connection");

console.log("you are in data/users.ts");

async function getUsers() {
  const connection = await getConnection();
  const [rows] = await connection.execute("SELECT * FROM user");

  return rows;
}

module.exports = getUsers;
