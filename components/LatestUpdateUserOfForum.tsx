import { useEffect, useState } from "react";

export function LatestUpdateUserOfForum({ forumId }) {
  const [latestUser, setLatestUser] = useState(null);

  useEffect(() => {
    async function getLatestUser() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${forumId}/latestuser`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLatestUser(data);
        });
    }
    getLatestUser();
  }, [forumId]);
  return <div>{latestUser && latestUser.user_nicename}</div>;
}
