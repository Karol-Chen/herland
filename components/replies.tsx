import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import Reply from "./reply";
export default function Replies(postId: String, title: String) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRepliesByParentId({ postId, title }) {
      console.log(postId, title, "postId,title", typeof postId, typeof title);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}/replies`;
      console.log(url);
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}/replies`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data");
          setReplies(data);
          setLoading(false);
        });
    }
    if (postId && title) {
      getRepliesByParentId(postId, title);
    }
  }, [postId, title]);

  return (
    <div>
      {replies &&
        replies.map((reply) => {
          console.log(reply);
          return <Reply key={reply.ID} reply={reply} />;
        })}
    </div>
  );
}
