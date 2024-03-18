import { getPostById } from "@/lib/data/forums";
import { getTranslatedTitle } from "@/helper";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { title, postId } = req.query;
      const post = await getPostById(postId);
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
