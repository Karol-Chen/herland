import Link from "next/link";
import Image from "next/image";
import herlandLogo from "../public/cropped-herland.png";
import herlandBanner from "../public/banner.jpg";
import styles from "../styles/components.module.css";

export default function Navigation() {
  return (
    <div style={{ position: "relative" }}>
      <ul className={styles.navigation}>
        <Link href="/">
          <Image
            src={herlandLogo}
            alt="herland"
            layout="raw"
            quality={100}
            priority={true}
            style={{ width: "50%", height: "auto" }}
          ></Image>
        </Link>
        <div className={styles.navigation_right}>
          <Link href="/aboutus">about us</Link>
          <Link href="/forums/forums">forums</Link>
          <Link href="#">sign up</Link>
        </div>
        {/* <li>contact us</li> */}
      </ul>
    </div>
  );
}
