const getFroums = require("../../lib/data/forums");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const forums = await getFroums();
      res.status(200).json(forums);
    } catch (error) {
      res.status(500).json({ error: "Error fetching forums" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
