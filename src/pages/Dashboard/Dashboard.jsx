import { useEffect } from "react";
import { Link } from "react-router-dom";



const Dashboard = () => {
  useEffect(() => {
    document.title = "ChronoView — Dashboard";
  }, []);

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>Here you’ll see your timelines, analytics, and data summaries.</p>
    </div>
  );
};

export default Dashboard;

