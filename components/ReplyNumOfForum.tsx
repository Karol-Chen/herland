import { useEffect, useState } from "react";

export default function ReplyNumOfForum({ forumId }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllRepliesByForumId(forumId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${forumId}/replies`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setReplies(data);
        });
    }

    getAllRepliesByForumId(forumId);
  }, [forumId]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div>{replies.length}</div>;
  }
}
