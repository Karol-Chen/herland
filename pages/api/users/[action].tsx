// pages/api/user/login.js
import { checkCredentials, createUser } from "../../../lib/auth";
import checkEmailFormat from "../../../helper";

export default async function handler(req, res) {
  const { action } = req.query;
  console.log(req.query, "req.query");
  console.log(action, "action");

  if (action === "login" && req.method === "POST") {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: "Email or password is missing" });
        return;
      }
      if (password.length < 8) {
        res
          .status(400)
          .json({ error: "Password should be at least 8 characters long" });
        return;
      }
      if (!checkEmailFormat(email)) {
        res.status(400).json({ error: "Please enter a valid email address." });
        return;
      }
      const valid = await checkCredentials(email, password);
      if (valid) {
        res.status(200).json({ status: "success" });
      } else {
        res.status(401).json({
          status: "error",
          error: "Incorrect email or password.",
        });
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
      res.status(500).json({ error: error.message });
    }
  } else if (action === "signup" && req.method === "POST") {
    const { email, password, invtCode } = req.body;
    if (!invtCode) {
      res.status(400).json({ error: "Please enter the invitation code." });
      return;
    }
    if (!email || !password) {
      res.status(400).json({ error: "Email or password is missing" });
      return;
    }
    if (password.length < 8) {
      res
        .status(400)
        .json({ error: "Password should be at least 8 characters long" });
      return;
    }
    if (!checkEmailFormat(email)) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }
    try {
      const user = await createUser(email, password, invtCode);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
