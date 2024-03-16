import React, { useEffect, useState } from "react";

export function LatestUpdateTimeOfForum({ forumId }) {
  const [timeGap, setTimeGap] = useState("");
  const now = new Date();

  useEffect(() => {
    async function getLatestUpdateTime() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${forumId}/latestpost`)
        .then((res) => res.json())
        .then((data) => {
          const date = new Date(data.post_date);
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
