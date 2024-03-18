import { getPostLevelData } from "@/lib/data/forums";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { postId } = req.query;
      const { post, user } = await getPostLevelData(postId);
      res.status(200).json({ post, user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
