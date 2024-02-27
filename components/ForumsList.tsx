import Forum from "./Forum";
import { useEffect, useState } from "react";
import Link from "next/link";
import { get } from "http";
import { getEnglishTitle } from "./../helper";

export default function ForumList() {
  // const ForumList = [
  //   {
  //     id: 1,
  //     title: "Pinned",
  //   },
  //   {
  //     id: 2,
  //     title: "Her Assistance",
  //   },
  //   {
  //     id: 3,
  //     title: "Her Creations",
  //   },
  //   {
  //     id: 4,
  //     title: "Herstory",
  //   },
  //   {
  //     id: 5,
  //     title: "Her Life",
  //   },
  //   {
  //     id: 6,
  //     title: "Her Reading",
  //   },
  //   {
  //     id: 7,
  //     title: "test",
  //   },
  // ];
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

  // function getEnglishTitle(title: string) {
  //   const map = {
  //     "*置顶*": "Pinned",
  //     她互助: "Her Assistance",
  //     她创作: "Her Creations",
  //     她历史: "Herstory",
  //     她生活: "Her Life",
  //     她读书: "Her Reading",
  //     测试: "test",
  //   };
  //   return map[title];
  // }

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
