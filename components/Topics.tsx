import { useEffect, useState } from "react";
import Topic from "./Topic";
export default function Topics({
  posts,
  forum,
}: {
  posts: any;
  title: String;
}) {
  return (
    <ul>
      {posts &&
        posts.map((post: any) => (
          <Topic key={post.ID} post={post} forum={forum} />
        ))}
    </ul>
  );
}
