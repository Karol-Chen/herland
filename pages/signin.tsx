import herlandLogo from "../public/cropped-herland.png";
// import { ReactComponent as BgImage } from "../public/Background.svg";
import BgImage from "../public/Background.svg";
import logo from "../public/Logo.svg";
import Image from "next/image";
import styles from "../styles/api.module.css";
import Link from "next/link";
export default function SignIn() {
  return (
    <div>
      {/* <img src={BgImage} alt="background image" className={styles.bgImage} />
       */}
      <Image
        src={BgImage}
        alt="background image"
        style={{ position: "absolute", zIndex: -1 }}
      />

      <div className={styles.signInBox}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo"></Image>
        </div>
        <div className={styles.signInFrom}>
          <div className={styles.buttonBox}>
            <button className={styles.button}>Sign In</button>
            <button className={styles.btnWhite}>Register</button>
          </div>
          <form className={styles.formBox}>
            <input type="text" placeholder="username" />
            <br />
            <input type="password" placeholder="password" />
            <br />
            <Link href="#" className={styles.fgpwLink}>
              Forget Password?
            </Link>
            <br />
            <input className={styles.button} type="submit" value="Sign In" />
          </form>
        </div>
      </div>
    </div>
  );
}
