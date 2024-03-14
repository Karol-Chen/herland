import { useEffect, useState } from "react";

export default function ReplyNumOfForum({ title }: { title: string }) {
  const [replies, setReplies] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function getPostsByForumTitle(title: string) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/forums/${title}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("get posts by forum title", title, data);
          setPostList(data);
          getRepliesFromAllPosts(data);
        });
    }

    async function getRepliesFromAllPosts(postList: any[]) {
      postList.map((post) => {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/forums/${title}/${post.ID}/replies`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("get replies from all posts", title, data);
            setReplies((prevReplies) => [...prevReplies, ...data]);
          });
      });
    }

    getPostsByForumTitle(title);
  }, [title]);

  return (
    <div>
      <p>{replies.length}</p>
    </div>
  );
}
