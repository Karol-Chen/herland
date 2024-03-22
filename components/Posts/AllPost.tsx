import { useState, useEffect } from "react";
import Link from "next/link";
export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const idToForum = {
    226: "pinned",
    146: "herstory",
    152: "herreactions",
    158: "herreading",
    150: "herassistance",
    148: "herlife",
  };

  useEffect(() => {
    async function getAllPosts() {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts?sort=desc&sortBy=post_date`
      )
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }
    getAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.ID}>
          <Link href={`/forums/${idToForum[post.post_parent]}/${post.ID}`}>
            {post.post_title}
          </Link>
        </div>
      ))}
    </div>
  );
}
