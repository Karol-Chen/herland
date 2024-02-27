import { getPostFromForum } from "../../../lib/data/forums";
import { getTranslatedTitle } from "../../../helper";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      //return all the posts in the current forum
      console.log(req.query.title, "req.query.slug");
      const translatedTitle = getTranslatedTitle(req.query.title);
      console.log(translatedTitle, "translatedTitle");
      const posts = await getPostFromForum(translatedTitle);
      //   console.log(posts, "posts");
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error fetching posts from forum" });
    }
  }
  return null;
}
