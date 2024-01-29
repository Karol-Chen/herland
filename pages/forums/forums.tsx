import Layout from "../../components/layout";
import ForumList from "@/components/ForumsList";
import SearchBar from "@/components/SearchBar";

export default function Forums() {
  return (
    <Layout>
      <SearchBar />
      <ForumList />
    </Layout>
  );
}
