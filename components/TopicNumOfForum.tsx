import { useEffect, useState } from "react";
import { getEnglishTitle } from "./../helper";

export default function TopicNumOfForum({ title }: { title: string }) {
  const [topicNum, SetTopicNum] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTopicsNum() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums/${title}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          SetTopicNum(data.length);
        });
    }
    if (title) {
      getTopicsNum();
    }
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <p>{topicNum}</p>
      </div>
    );
  }
}
