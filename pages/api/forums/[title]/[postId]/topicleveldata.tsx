import { getTopicLevelData } from "@/lib/data/forums";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      console.log(
        "you are in pages/api/forums/[title]/[postId]/topicleveldata.tsx"
      );
      const { title, postId } = req.query;
      console.log(postId, "postId in topicleveldata api");
      if (!title || !postId) {
        return res.status(400).json({ error: "Missing title or postId" });
      }
      const { startUser, partiNum, repliesNum, latestUser, latestTime } =
        await getTopicLevelData(postId);
      res
        .status(200)
        .json({ startUser, partiNum, repliesNum, latestUser, latestTime });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
