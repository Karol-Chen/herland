import Layout from "../components/layout";
require("dotenv").config();
import styles from "../styles/signup.module.css";
import Image from "next/image";
import Link from "next/link";
import herlandLogo from "../public/cropped-herland.png";
// import { ReactComponent as BgImage } from "../public/Background.svg";
import BgImage from "../public/Background.svg";
import userIcon from "../public/userIcon.svg";
import passwordIcon from "../public/passwordIcon.svg";
import logo from "../public/Logo.svg";
export default function SignUp() {
  function handleSubmit(event) {
    return alert("You have registered successfully");
  }
  return (
    // <Layout>
    //   <div className="Registration">
    //     <h1>Registration</h1>
    //     <form onSubmit={handleSubmit}>
    //       username: <input type="text" placeholder="username" />
    //       <br />
    //       email: <input type="text" placeholder="email" />
    //       <br />
    //       invitation code: <input type="text" placeholder="invitation code" />
    //       <br />
    //       password: <input type="password" placeholder="password" />
    //       <br />
    //       confirm password:{" "}
    //       <input type="password" placeholder="confirm password" />
    //       <br />
    //       <input type="submit" value="Register" />
    //       <br />
    //     </form>
    //   </div>
    // </Layout>
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
            <input type="text" placeholder={"invitation code"} />
            <input type="text" placeholder={"username or email"} />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="confirm password" />
            <Link href="#" className={styles.fgpwLink}>
              Invitation Code
            </Link>
            <input className={styles.btnLarge} type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
}
