// pages/api/user/login.js
import { checkCredentials, createUser } from "../../../lib/auth";

export default async function handler(req, res) {
  const { action } = req.query;
  console.log(req.query, "req.query");
  console.log(action, "action");

  if (action === "login" && req.method === "POST") {
    try {
      const { email, password } = req.body;
      const valid = await checkCredentials(email, password); // Check the credentials
      if (valid) {
        // If the credentials are valid, send a success response
        res.status(200).json({ status: "success" });
      } else {
        // If the credentials are not valid, send an error response
        res.status(401).json({ status: "error", error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
      throw error;
    }
  } else if (action === "signup" && req.method === "POST") {
    const { email, password } = req.body;
    const user = await createUser(email, password); // Create a new user

    if (user) {
      // If the user is created successfully, send a success response
      res.status(200).json({ status: "success" });
    } else {
      // If the user is not created, send an error response
      res.status(500).json({ status: "error", error: "Failed to create user" });
    }
  } else {
    // If the request method is not POST, or the action is not recognized, send an error response
    res.status(405).json({ status: "error", error: "Method not allowed" });
  }
}
