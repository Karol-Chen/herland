import herlandLogo from "../public/cropped-herland.png";
// import { ReactComponent as BgImage } from "../public/Background.svg";
import BgImage from "../public/Background.svg";
import userIcon from "../public/userIcon.svg";
import passwordIcon from "../public/passwordIcon.svg";
import logo from "../public/Logo.svg";
import Image from "next/image";
import styles from "../styles/signin.module.css";
import Link from "next/link";
export default function SignIn() {
  return (
    <div className={styles.signInPage}>
      {/* <img src={BgImage} alt="background image" className={styles.bgImage} />
       */}

      <div className={styles.signInBox}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo"></Image>
        </div>
        <div className={styles.signInFrom}>
          <div className={styles.buttonBox}>
            <Link href="/signin" className={styles.btnRed}>
              <p>Sign In</p>
            </Link>
            <Link href="/signup" className={styles.btnWhite}>
              <p>Register</p>
            </Link>
          </div>
          <form className={styles.formBox}>
            <input type="text" placeholder={"username or email"} />
            <input type="password" placeholder="password" />
            <Link href="#" className={styles.fgpwLink}>
              Forget Password?
            </Link>
            <input className={styles.btnLarge} type="submit" value="Sign In" />
          </form>
        </div>
      </div>
    </div>
  );
}
