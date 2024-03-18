import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
export default function PostCard({ postId, title }) {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPostDataById(postId) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}/postleveldata`
      )
        .then((res) => res.json())
        .then((data) => {
          setPost(data.post);
          setUser(data.user);
          setLoading(false);
        });
    }
    if (postId) {
      getPostDataById(postId);
    }
  }, [postId, title]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post && post.post_title}</h1>
      time: {post && post.post_modified_gmt}
      <span></span>
      user: {user && user.user_nicename}
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post && post.post_content),
        }}
      />
    </div>
  );
}
