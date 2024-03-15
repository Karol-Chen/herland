import { METHODS } from "http";
import { getAllRepliesByForumId } from "../../../lib/data/forums";

export default async function handler(req, res) {
  const { forumId, sort } = req.query;
  console.log(forumId, "forumId");
  if (req.method === "GET") {
    try {
      console.log("hello you are in the api forumId replies");
      const replies = await getAllRepliesByForumId(forumId, sort);
      res.status(200).json(replies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
