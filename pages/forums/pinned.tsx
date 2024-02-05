import Layout from "../../components/layout";
import SearchBar from "../../components/searchbar";

export default function Pinned() {
  const topics = [
    {
      id: 1,
      title: "disccusion",
      participants: [1, 2, 3],
      replies: ["meow", "ao", "wof"],
      pinned: true,
    },
  ];
  return (
    <Layout>
      <h1>Pinned</h1>
      <p>These are the pinned posts</p>
      <SearchBar />
      <div>posts</div>
      <div>newtopic</div>
    </Layout>
  );
}
