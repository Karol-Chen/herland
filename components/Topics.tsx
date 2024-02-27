import Link from "next/link";
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
          <li key={post.id}>
            <Link href={`/forums/${forum}/${post.ID}`}>{post.post_title}</Link>
          </li>
        ))}
    </ul>
  );
}
