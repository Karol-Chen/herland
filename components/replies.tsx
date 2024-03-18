import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import Reply from "./reply";
export default function Replies({
  postId,
  title,
}: {
  postId: string;
  title: string;
}) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRepliesByParentId(postId, title) {
      console.log(
        "url of api: ",
        `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}/replies`
      );
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}/replies`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "replies in the replies.tsx component");
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
