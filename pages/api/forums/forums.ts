import { getForums } from "../../../lib/data/forums";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const forums = await getForums();
      res.status(200).json(forums);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
