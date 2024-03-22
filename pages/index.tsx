// import RootLayout from "@/app/layout";
// import Navigation from "@/components/navigation";
// import Footer from "@/components/footer";
import AllPosts from "@/components/Posts/AllPost";
import Layout from "../components/layout";
require("dotenv").config();

export default function Home() {
  return (
    <Layout>
      <AllPosts />
    </Layout>
  );
}
