import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useState, useEffect } from "react";
import Replies from "@/components/replies";
import PostCard from "@/components/Posts/PostCard";

export default function PostPage() {
  const router = useRouter();
  const { title, postId } = router.query;
  console.log("title and postId: ", title, postId);
  console.log(typeof postId, "postId type");
  console.log(typeof title, "title type");
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
        `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${postId}/topicleveldata`
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
  }, [postId, title]);

  return (
    <Layout>
      <div>
        {data && (
          <div>
            <h1>
              This topic contains {replyNum} replies, {participatedUser}{" "}
              participants. Last updated by {lastUpdateUser?.user_nicename}{" "}
              {lastUpdateTime}
            </h1>
          </div>
        )}
        {postId && title && <PostCard postId={postId} title={title} />}
        <br />
        {postId && title && <Replies postId={postId} title={title} />}
      </div>
    </Layout>
  );
}
