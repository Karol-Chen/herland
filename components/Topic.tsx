import { useState, useEffect } from "react";
import Link from "next/link";
export default function Topic({ post, forum }) {
  const [startedUser, setStartedUser] = useState("");
  const [participatedUser, setParticipatedUser] = useState(0);
  const [replyNum, setReplyNum] = useState(0);
  const [lastUpdateUser, setLastUpdateUser] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [data, setData] = useState(false);

  useEffect(() => {
    //fetch data
    function getTopicLevelData() {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forums/${forum}/${post.ID}/topicleveldata`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setStartedUser(data.startUser);
          setParticipatedUser(data.partiNum);
          setReplyNum(data.repliesNum);
          setLastUpdateUser(data.latestUser);
          setLastUpdateTime(data.latestTime);
        });
    }

    getTopicLevelData();
  }, [post, forum]);
  return (
    <div>
      {data && (
        <li key={post.id}>
          <Link href={`/forums/${forum}/${post.ID}`}>{post.post_title}</Link>
          started by {startedUser.user_nicename}
          <div>
            participatedUser: {participatedUser}
            <br />
            replyNum: {replyNum}
            <br />
            lastUpdateUser:
            {lastUpdateUser && lastUpdateUser?.user_nicename}
            <br />
            lastUpdateTime: {lastUpdateTime}
          </div>
        </li>
      )}
    </div>
  );
}
