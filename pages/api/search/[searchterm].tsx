import { getAllPostsBySearchTerm } from "@/lib/data/forums";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const searchterm = req.query.searchterm;
      if (!searchterm) {
        return res.status(400).json({ error: "search term is required" });
      }
      const posts = await getAllPostsBySearchTerm(searchterm);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
