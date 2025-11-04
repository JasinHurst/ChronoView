import { useEffect } from "react";
import "./About.css"



const About = () => {
  useEffect(() => {
    document.title = "ChronoView — About";
  }, []);

  return (
    <div className="page">
      <h1>About ChronoView</h1>
      <p>ChronoView helps you visualize time-based events in a clear, interactive way.</p>
    </div>
   
  );
};


export default About;

