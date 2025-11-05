import { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "./Home.css";

const Home = () => {
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    document.title = "ChronoView — Home";
  }, []);

  
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard"); 
  };

  return (
    <div className="home-layout">
      <div className="about-section">
        <h1>ChronoView — Where Time Reveals the Pattern</h1>
        <p>
          ChronoView is a platform designed for those who seek to understand the
          deeper mechanics of time and markets. By combining Gann methodology,
          numerology, time-cycles and astrology, ChronoView provides a structured
          environment to analyze, test, and visualize cycles that influence
          financial and personal events.
        </p>

        <p>
          Whether you’re a seasoned technical analyst or a curious explorer of
          time-based systems, ChronoView empowers you to uncover hidden
          correlations, refine your methods, and gain insights from the
          intersection of mathematics, vibration, and cosmic rhythm.
        </p>
      </div>

      <div className="home-login-box">
        <h2>Log in to ChronoView</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
        <p className="login-footer">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
