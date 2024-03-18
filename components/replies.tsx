import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import Reply from "./reply";
export default function Replies({ postId, title }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRepliesByParentId({ postId, title }) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}/replies`
      )
        .then((res) => res.json())
        .then((data) => {
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
          return <Reply key={reply?.ID} reply={reply} />;
        })}
    </div>
  );
}
