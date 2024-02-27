import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import SearchBar from "../../components/searchbar";
import Topics from "../../components/topics";
import Link from "next/link";

export default function ForumPage() {
  const router = useRouter();
  const { title } = router.query;
  console.log(title);

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
        <SearchBar />
        {posts?.length > 0 && <Topics posts={posts} forum={title} />}
        <div>newtopic</div>
      </Layout>
    );
  }
}
