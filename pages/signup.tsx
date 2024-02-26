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
import checkEmailFormat from "../helper";
import { set } from "firebase/database";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [invtCode, setInvtCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invError, setInvError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPWError, setConfirmPWError] = useState("");
  const [error, setError] = useState("");
  // const [ifHidden, setIfHidden] = useState(true);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !invtCode || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setIfHidden(false);
      return;
    }
    if (password.length < 8) {
      return setError("Password should be at least 8 characters long");
    }
    if (!checkEmailFormat(email)) {
      return setError("Please enter a valid email address.");
    }

    if (password !== confirmPassword) {
      return setError("Password and confirm password do not match");
    }
    const data = { email, invtCode, password };
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        console.log("res", res);
        router.push("/signin");
      } else {
        const errorData = await res.json();
        console.log("errorData", errorData);
        setError(errorData.error);
      }
      // else {
      //   console.error("Error adding user:", res.statusText);
      //   console.log(res);
      //   // const errorData = await res.json(); // Get error message from response body
      //   setError(error.error);
      // }
    } catch (error) {
      console.log("error in signup.tx", error);
      console.log(error);
      setError(error.error);
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
          <p className={styles.error}>{error}</p>
          <form className={styles.formBox} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={"INVITATION CODE"}
              onChange={(e) => setInvtCode(e.target.value)}
            />
            {invError && <p className={styles.error}>{invError}</p>}
            <input
              type="text"
              placeholder={"EMAIL"}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
            <input
              type="password"
              placeholder="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPWError && <p className={styles.error}>{confirmPWError}</p>}
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
