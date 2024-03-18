import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
export default function PostCard({ postId, title }) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPostById(postId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setLoading(false);
        });
    }
    if (postId) {
      getPostById(postId);
    }
  }, [postId, title]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post && post.post_title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post && post.post_content),
        }}
      />
    </div>
  );
}
