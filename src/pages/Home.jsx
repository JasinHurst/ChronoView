import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    document.title = "ChronoView — Home";
  }, []);

  return (
    <div className="page">
      <h1>Welcome to ChronoView</h1>

      {!choice && (
        <div className="user-choice-box">
          <h2>How would you like to continue?</h2>
          <div className="button-group">
            <button onClick={() => setChoice("login")}>Log In</button>
            <button onClick={() => setChoice("create")}>Create Account</button>
            <button onClick={() => setChoice("guest")}>Continue as Guest</button>
          </div>
        </div>
      )}

      {choice === "create" && (
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Display Name" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Create Account</button>
        </form>
      )}

      {choice === "login" && (
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      )}

      {choice === "guest" && <p>Continuing as guest...</p>}
    </div>
  );
};

export default Home;
