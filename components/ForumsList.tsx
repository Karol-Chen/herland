import Forum from "./Forum";
import { useEffect, useState } from "react";
import Link from "next/link";
import { get } from "http";
import { getEnglishTitle } from "./../helper";
import ReplyNumOfForum from "./ReplyNumOfForum";
import TopicNumOfForum from "./TopicNumOfForum";
import { LatestUpdateTimeOfForum } from "./LatestUpdateTimeOfForum";
import { LatestUpdateUserOfForum } from "./LatestUpdateUserOfForum";
export default function ForumList() {
  const [forumList, setForumList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicsNum, SetTopicsNum] = useState(0);

  useEffect(() => {
    async function getData() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums/forums`)
        .then((res) => res.json())
        .then((data) => {
          setForumList(data);
          setLoading(false);
        });
    }

    getData();
  }, []);

  function formatTitleForUrl(title: string) {
    return title.replace(/\s/g, "").toLowerCase();
  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {forumList?.map((forum) => {
          return (
            <div key={forum.id}>
              <Link
                href={
                  "/forums/" +
                  formatTitleForUrl(getEnglishTitle(forum.post_title))
                }
              >
                <Forum key={forum.id} forum={forum} />
              </Link>
              <TopicNumOfForum
                title={formatTitleForUrl(getEnglishTitle(forum.post_title))}
              />
              <ReplyNumOfForum forumId={forum.ID} />
              <LatestUpdateTimeOfForum forumId={forum.ID} />
              <LatestUpdateUserOfForum forumId={forum.ID} />
            </div>
          );
        })}
      </div>
    );
  }
}
