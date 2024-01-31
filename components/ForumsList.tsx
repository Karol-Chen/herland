import Forum from "./Forum";
import { useEffect, useState } from "react";

export default function ForumList() {
  const ForumList = [
    {
      id: 1,
      name: "Pinned",
    },
    {
      id: 2,
      name: "Her Assistance",
    },
    {
      id: 3,
      name: "Her Creations",
    },
    {
      id: 4,
      name: "Her History",
    },
    {
      id: 5,
      name: "Her Life",
    },
    {
      id: 6,
      name: "Her Reading",
    },
    {
      id: 7,
      name: "test",
    },
  ];
  const [forumList, setForumList] = useState(ForumList);

  useEffect(() => {
    console.log("you are in useEffect");
    function getData() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setForumList(data);
        });
    }

    getData();
  }, []);
  return (
    <div>
      {ForumList?.map((forum) => (
        <Forum key={forum.id} forum={forum} />
      ))}
    </div>
  );
}
