import Link from "next/link";
import Image from "next/image";
import herlandLogo from "../public/cropped-herland.png";
import herlandBanner from "../public/banner.jpg";

export default function Navigation() {
  return (
    <div style={{ position: "relative" }}>
      {/* <Image
        src={herlandBanner}
        alt="banner"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{ position: "absolute", zIndex: -1 }}
      ></Image> */}
      <ul>
        <Link href="/">
          <Image
            src={herlandLogo}
            alt="herland"
            layout="raw"
            quality={100}
            priority={true}
            style={{ width: "17%", height: "auto" }}
          ></Image>
        </Link>
        <br></br>
        <Link href="/aboutus">about us</Link>
        <br></br>
        <Link href="/forums/forums">forums</Link>
        {/* <li>contact us</li> */}
      </ul>
    </div>
  );
}
