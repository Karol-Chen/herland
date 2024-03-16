import { getLatestUpdatedPostByForumId } from "@/lib/data/forums";

export default async function handler(req, res) {
  const { forumId } = req.query;
  if (req.method === "GET") {
    try {
      const latestPost = await getLatestUpdatedPostByForumId(forumId);
      res.status(200).json(latestPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
