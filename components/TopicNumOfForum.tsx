import { useEffect, useState } from "react";
import { getEnglishTitle } from "./../helper";

export default function TopicNumOfForum({ title }: { title: string }) {
  const [topicNum, SetTopicNum] = useState(0);
  console.log(title, "*******title");

  useEffect(() => {
    async function getTopicsNum() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums/${title}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(
            "**************************************************",
            data
          );
          SetTopicNum(data.length);
        });
    }
    if (title) {
      getTopicsNum();
    }
  }, [title]);

  return (
    <div>
      <p>{topicNum}</p>
    </div>
  );
}
