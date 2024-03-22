import { getAllPosts } from "@/lib/data/forums";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      //do sth
      const { sort, sortBy } = req.query;
      console.log(sort, sortBy, "sort, sortBy in api");
      const posts = await getAllPosts(sort, sortBy);
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
