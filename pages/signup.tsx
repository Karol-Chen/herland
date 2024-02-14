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
import { useContext, useState, createContext } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [invtCode, setInvtCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("Password and confirm password do not match");
    }
    const data = { username, email, invtCode, password };
    console.log(data);
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      console.error("Error adding user:", res.statusText);
    }
  }

  return (
    <div className={styles.signInPage}>
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
          <form className={styles.formBox} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={"invitation code"}
              onChange={(e) => setInvtCode(e.target.value)}
            />
            <input
              type="text"
              placeholder={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Link href="#" className={styles.fgpwLink}>
              Get Invitation Code
            </Link>
            <input className={styles.btnLarge} type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
}
