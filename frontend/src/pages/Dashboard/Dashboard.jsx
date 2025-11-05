import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    document.title = "ChronoView — Dashboard";
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Welcome to your Dashboard</h1>
      <p className="subtitle">
        Explore your timelines, analytics, and celestial insights below.
      </p>

      <div className="dashboard-links">
        <Link to="/chart" className="dashboard-btn">Open Chart</Link>
      </div>
    </div>
  );
};

export default Dashboard;

