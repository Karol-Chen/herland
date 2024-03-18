import herlandLogo from "../public/cropped-herland.png";
// import { ReactComponent as BgImage } from "../public/Background.svg";
import BgImage from "../public/Background.svg";
import userIcon from "../public/userIcon.svg";
import passwordIcon from "../public/passwordIcon.svg";
import logo from "../public/Logo.svg";
import Image from "next/image";
import styles from "../styles/signin.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/");
      } else {
        console.error("Error adding user:", res.statusText);
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }
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
          <p className={styles.error}>{error}</p>
          <form className={styles.formBox} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={"EMAIL"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            />
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
