// import { getConnection } from "../config/connection";

// const getConnection = require("../config/connection");
const connectToDb = require("../config/connection");

async function getForums() {
  let connection;
  try {
    const pool = await connectToDb();
    connection = await pool.getConnection();
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
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

async function getPostFromForum(slug) {
  let connection;
  try {
    const pool = await connectToDb();
    connection = await pool.getConnection();
    let [rows] = await connection.execute(
      "SELECT * FROM wp_posts WHERE post_parent = (SELECT ID FROM wp_posts WHERE post_title = ? AND post_type = 'forum') AND post_status='publish'",
      [slug]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching posts from forum:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

async function getAllPostsByForumId(forumId, sort) {
  let connection;
  try {
    const pool = await connectToDb();
    connection = await pool.getConnection();
    const order = sort === "desc" ? "DESC" : "ASC";
    const [rows] = await connection.execute(
      `SELECT * FROM wp_posts WHERE post_parent = (?) AND post_status='publish' ORDER BY post_date ${order};`,
      [forumId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching posts from forum:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

async function getPostById(id: string) {
  let connection;
  try {
    const pool = await connectToDb();
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM wp_posts WHERE ID = (?)",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log(error.message);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

async function getRepliesByParentId(parentId) {
  let connection;
  try {
    const pool = await connectToDb();
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM wp_posts WHERE post_parent=(?) AND post_status='publish';",
      [parentId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching replies from forum:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

async function getPostAndRepliesByForumId(slug: string) {
  let connection;
  try {
    const pool = await connectToDb();
    const topic = await getPostFromForum(slug);
    const replies = await getRepliesByParentId(topic[0].ID);
    return { topic, replies };
  } catch (error) {
    console.error("Error fetching posts from forum:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

async function getAllRepliesByForumId(forumId: number, sort: string) {
  let connection;
  try {
    const pool = await connectToDb();
    connection = await pool.getConnection();
    const order = sort === "desc" ? "DESC" : "ASC";
    const [rows] = await connection.execute(
      `SELECT * FROM wp_posts WHERE post_parent IN (SELECT ID FROM wp_posts WHERE post_parent=(?)) AND post_status='publish' ORDER BY post_date ${order};`,
      [forumId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching posts from forum:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

async function getLatestUpdatedPostByForumId(forumId: number) {
  let connection;
  try {
    const pool = await connectToDb();
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM wp_posts WHERE post_parent IN (SELECT ID FROM wp_posts WHERE post_parent=(?)) AND post_status='publish' ORDER BY post_date DESC LIMIT 1;`,
      [forumId]
    );
    const post = await getAllPostsByForumId(forumId, "desc");
    const latestPost = post[0];
    const latestReply = rows[0];
    if (!latestReply || latestPost.post_date > latestReply.post_date) {
      return latestPost;
    } else {
      return latestReply;
    }
  } catch (error) {
    console.log("Error fetching posts from forum:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

export {
  getForums,
  getPostFromForum,
  getPostById,
  getRepliesByParentId,
  getPostAndRepliesByForumId,
  getAllRepliesByForumId,
  getLatestUpdatedPostByForumId,
};
