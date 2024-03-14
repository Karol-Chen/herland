// import { getConnection } from "../config/connection";

const getConnection = require("../config/connection");

async function getForums() {
  let connection;
  try {
    connection = await getConnection();
    console.log("you are in data/forums.ts");
    let [rows] = await connection.execute(
      "SELECT * FROM wp_posts WHERE post_type = 'forum' AND post_status = 'publish'"
    );
    let pinned = rows.filter((row) => row.post_title === "*置顶*");
    let others = rows.filter((row) => row.post_title !== "*置顶*");
    rows = pinned.concat(others);
    return rows;
  } catch (error) {
    console.error("Error fetching forums:", error);
    throw error;
  }
}

async function getPostFromForum(slug) {
  let connection;
  try {
    console.log(slug, "slug");
    connection = await getConnection();
    let [rows] = await connection.execute(
      "SELECT * FROM wp_posts WHERE post_parent = (SELECT ID FROM wp_posts WHERE post_title = ? AND post_type = 'forum') AND post_status='publish'",
      [slug]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching posts from forum:", error);
    throw error;
  }
}

async function getPostById(id: string) {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM wp_posts WHERE ID = (?)",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function getRepliesByParentId(parentId) {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM wp_posts WHERE post_parent=(?) AND post_status='publish';",
      [parentId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching replies from forum:", error);
    throw error;
  }
}

async function getPostAndRepliesByForumId(slug: string) {
  let connection;
  try {
    const topic = await getPostFromForum(slug);
    const replies = await getRepliesByParentId(topic[0].ID);
    return { topic, replies };
  } catch (error) {
    console.error("Error fetching posts from forum:", error);
    throw error;
  }
}

async function getAllPostsByForumId() {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute("");
    return rows;
  } catch (error) {
    console.log("Error fetching posts from forum:", error);
    throw error;
  }
}
// module.exports = { getForums, getPostFromForum };
export {
  getForums,
  getPostFromForum,
  getPostById,
  getRepliesByParentId,
  getPostAndRepliesByForumId,
};
