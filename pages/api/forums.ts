const getForums = require("../../lib/data/forums");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const forums = await getForums();
      console.log("you are in pages/api/forums.ts", forums);
      console.log(forums);
      res.status(200).json(forums);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Error fetching forums" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
