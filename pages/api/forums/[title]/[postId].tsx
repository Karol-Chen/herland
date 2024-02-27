import { getPostById } from "@/lib/data/forums";
import { getTranslatedTitle } from "@/helper";
import { error } from "console";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { title, postId } = req.query;
      console.log(postId, "postId");
      const post = await getPostById(postId);
      console.log(post, "post");
      res.status(200).json(post);
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
  return null;
}
