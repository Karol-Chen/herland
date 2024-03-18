const connectToDb = require("../config/connection");
import { getLatestUpdatedPostByForumId } from "./forums";
// import {getConnection} from "../config/connection";

async function getUsers() {
  const pool = await connectToDb();
  const connection = await pool.getConnection();
  try {
    const [rows] = await pool.execute("SELECT * FROM user");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function addUser({ email, password }) {
  const pool = await connectToDb();
  const connection = await pool.getConnection();
  try {
    const [rows] = await pool.execute(
      "INSERT INTO user (email,password) VALUES (?,?)",
      [email, password]
    );
    return rows;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function getUserById(id) {
  const pool = await connectToDb();
  const connection = await pool.getConnection();
  try {
    const [rows] = await pool.execute("SELECT * FROM wp_users WHERE id = ?", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

export default async function getLatestUserByForumId(forumId) {
  const pool = await connectToDb();
  const connection = await pool.getConnection();
  try {
    const post = await getLatestUpdatedPostByForumId(forumId);
    const user = await getUserById(post.post_author);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

export { getUsers, addUser, getUserById, getLatestUserByForumId };
