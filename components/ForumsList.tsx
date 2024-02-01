import Forum from "./Forum";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ForumList() {
  const ForumList = [
    {
      id: 1,
      title: "Pinned",
    },
    {
      id: 2,
      title: "Her Assistance",
    },
    {
      id: 3,
      title: "Her Creations",
    },
    {
      id: 4,
      title: "Herstory",
    },
    {
      id: 5,
      title: "Her Life",
    },
    {
      id: 6,
      title: "Her Reading",
    },
    {
      id: 7,
      title: "test",
    },
  ];
  const [forumList, setForumList] = useState(ForumList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("you are in useEffect");
    function getData() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums`)
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
            href={"/forums/" + formatTitleForUrl(forum.title)}
            key={forum.id}
          >
            <Forum key={forum.id} forum={forum} />
          </Link>
        ))}
      </div>
    );
  }
}
