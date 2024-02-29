import Forum from "./Forum";
import { useEffect, useState } from "react";
import Link from "next/link";
import { get } from "http";
import { getEnglishTitle } from "./../helper";

export default function ForumList() {
  const [forumList, setForumList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("you are in useEffect");
    function getData() {
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
        {forumList?.map((forum) => (
          <Link
            href={
              "/forums/" + formatTitleForUrl(getEnglishTitle(forum.post_title))
            }
            key={forum.id}
          >
            <Forum key={forum.id} forum={forum} />
          </Link>
        ))}
      </div>
    );
  }
}
