import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useState, useEffect } from "react";
import { set } from "firebase/database";

export default function PostPage() {
  const router = useRouter();
  const { title, postId } = router.query;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getPostById(postId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data");
          setPost(data);
          setLoading(false);
        });
    }
    if (postId) {
      getPostById(postId);
    }
  }, [postId, title]);

  return (
    <div>
      <Layout>
        <div>
          <h1>{post && post.post_title}</h1>
          <p>{post && post.post_content}</p>
        </div>
      </Layout>
      {/* Render your post data here */}
    </div>
  );
}
