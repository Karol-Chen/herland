const connectToDb = require("../config/connection");
import { getLatestUpdatedPostByForumId } from "./forums";
// import {getConnection} from "../config/connection";

console.log("you are in data/users.ts");

async function getUsers() {
  const pool = await connectToDb();
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute("SELECT * FROM user");
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
  console.log("connection status");
  try {
    console.log("before insert");
    const [rows] = await connection.execute(
      "INSERT INTO user (email,password) VALUES (?,?)",
      [email, password]
    );
    console.log("after insert");
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
  console.log("you are in getUserById", id);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM wp_users WHERE id = ?",
      [id]
    );
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
