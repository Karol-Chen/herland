const { getUsers, addUser } = require("../../lib/data/users");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }
  if (req.method === "POST") {
    try {
      const { username, email, invt_code, password } = JSON.parse(req.body);
      //************need to add the logic to check the invt_code
      const users = await addUser({ username, email, password });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error adding users" });
    }
  }
}
