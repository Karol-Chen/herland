import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import SearchBar from "../../components/searchbar";
import Topics from "../../components/topics";
import Link from "next/link";
import TopicNumOfForum from "@/components/TopicNumOfForum";
import ReplyNumOfForum from "@/components/ReplyNumOfForum";
import { LatestUpdateTimeOfForum } from "@/components/LatestUpdateTimeOfForum";
import { LatestUpdateUserOfForum } from "@/components/LatestUpdateUserOfForum";

export default function ForumPage() {
  const router = useRouter();
  const { title } = router.query;
  console.log(title);
  const titleToId = {
    pinned: 226,
    herstory: 146,
    herreactions: 152,
    herreading: 158,
    herassistance: 150,
    herlife: 148,
  };
  const titleId = titleToId[title];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts(title) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums/${title}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }

    if (title) {
      getPosts(title);
    }
  }, [title]);

  if (loading) return <div>Loading...</div>;
  else {
    return (
      <Layout>
        <h1>{title}</h1>
        <p>
          This forum contains <TopicNumOfForum title={title} />
          topics, <ReplyNumOfForum forumId={titleId} /> replies
        </p>
        <p>
          Last updated by
          <LatestUpdateUserOfForum forumId={titleId} />{" "}
          <LatestUpdateTimeOfForum forumId={titleId} />
        </p>
        <SearchBar />
        {posts?.length > 0 && <Topics posts={posts} forum={title} />}
        <div>newtopic</div>
      </Layout>
    );
  }
}
