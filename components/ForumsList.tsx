import Forum from "./Forum";
import { useEffect, useState } from "react";

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
      title: "Her History",
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

  useEffect(() => {
    console.log("you are in useEffect");
    function getData() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          console.log(typeof data);
          console.log(data);
          setForumList(data);
        });
    }

    getData();
  }, []);
  return (
    <div>
      {forumList?.map((forum) => (
        <Forum key={forum.id} forum={forum} />
      ))}
    </div>
  );
}
