import { getRepliesByParentId } from "@/lib/data/forums";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { title, postId } = req.query;
      console.log(postId, "postId");
      const replies = await getRepliesByParentId(postId);
      return res.status(200).json(replies);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
