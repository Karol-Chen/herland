import Navigation from "./navigation";
import Footer from "./footer";
import Image from "next/image";
import herlandLogo from "../public/cropped-herland.png";
import herlandBanner from "../public/banner.jpg";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div style={{ height: "20vh", position: "relative" }}>
        <Image
          src={herlandBanner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          style={{ position: "absolute", zIndex: -1 }}
        ></Image>
        <Navigation />
      </div>
      <main
        style={{
          backgroundColor: "#f0ebeb",
          height: "60vh",
          position: "relative",
        }}
      >
        {children}
      </main>
      <div
        style={{
          backgroundColor: "#EB9B78",
          height: "20vh",
          position: "relative",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
