import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Replies from "@/components/replies";

export default function PostPage() {
  const router = useRouter();
  const { title, postId } = router.query;
  // console.log(typeof postId, postId, "postId");
  // console.log(typeof title, title, "title");
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

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div>
        <h1>{post && post.post_title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post && post.post_content),
          }}
        />
        <br></br>
        <Replies postId={postId} title={title} />
      </div>
    </Layout>
  );
}
