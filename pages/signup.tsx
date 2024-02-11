import Layout from "../components/layout";
require("dotenv").config();

export default function SignUp() {
  function handleSubmit(event) {
    return alert("You have registered successfully");
  }
  return (
    <Layout>
      <div className="Registration">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          username: <input type="text" placeholder="username" />
          <br />
          email: <input type="text" placeholder="email" />
          <br />
          invitation code: <input type="text" placeholder="invitation code" />
          <br />
          password: <input type="password" placeholder="password" />
          <br />
          confirm password:{" "}
          <input type="password" placeholder="confirm password" />
          <br />
          <input type="submit" value="Register" />
          <br />
        </form>
      </div>
    </Layout>
  );
}
