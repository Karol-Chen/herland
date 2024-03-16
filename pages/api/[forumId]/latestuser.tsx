import getLatestUserByForumId from "@/lib/data/users";

export default async function handler(req, res) {
  const { forumId } = req.query;
  console.log(forumId, "forumId");
  if (req.method === "GET") {
    try {
      const latestUser = await getLatestUserByForumId(forumId);
      res.status(200).json(latestUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
