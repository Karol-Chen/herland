import React, { useEffect, useState } from "react";

export function LatestUpdateTimeOfForum(forumId: number) {
  const [timeGap, setTimeGap] = useState("");
  const now = new Date();

  useEffect(() => {
    async function getLatestUpdateTime() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${forumId}/replies?sort=desc`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0].post_date, "data");
          const date = new Date(data[0].post_date);
          console.log(date, "date");
          console.log(now, "now");
          const diffTime = Math.abs(now.getTime() - date.getTime());

          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const diffYears = Math.floor(diffDays / 365);
          const diffMonths = Math.floor((diffDays % 365) / 30);
          const remainingDays = diffDays - diffYears * 365 - diffMonths * 30;

          setTimeGap(
            `${diffYears} years, ${diffMonths} months, ${remainingDays} days`
          );
        });
    }
    getLatestUpdateTime();
  }, []);

  return (
    <div>
      <p>{timeGap}</p>
    </div>
  );
}
