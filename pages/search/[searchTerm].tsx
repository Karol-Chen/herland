import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Link from "next/link";
export default function SearchTerm() {
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const { searchTerm } = router.query;

  useEffect(() => {
    async function searchPosts(searchTerm) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data);
        });
    }

    if (searchTerm) {
      searchPosts(searchTerm);
    }
  }, [searchTerm]);

  return (
    <Layout>
      {searchResults &&
        searchResults.map((post) => {
          return (
            <>
              <Link href="#" key={post.ID}>
                {post.post_title}
              </Link>
              <br />
            </>
          );
        })}
    </Layout>
  );
}
