import "./Login.css";

export default function SignIn() {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <img
          alt="ChronoView"
          src="/favicon.ico"
          className="signin-logo"
        />
        <h2 className="signin-title">Sign in to ChronoView</h2>

        <form className="signin-form">
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />

          <button type="submit">Sign In</button>
        </form>

        <p className="signin-footer">
          Not a member?{" "}
          <a href="#">Create an account</a>
        </p>
      </div>
    </div>
  );
}
