import Navbar from "../components/Navbar";
import "../App.css";
import myPic from "../pics/Kanu.jpeg"; 
import myPic1 from "../pics/Avya.jpeg"; 

function About() {
  return (
    <div>
      <Navbar />

      <div className="about-container">
  <div className="about-img-container">
  <img
    src={myPic}
    alt="My Profile"
    className="about-img"
  />

  <img
    src={myPic1}
    alt="My Friend"
    className="about-img"
  />
</div>
       
        <h2>About US</h2>

        <p>
          Hello, I am <b>Kanushri</b> and my friend <b>Avya Juneja</b>.  
          We are Full Stack Developer passionate about building modern web applications.
        </p>

        <p>
          This Hotel Management System project is built using:
          React.js, Node.js, Express, and MongoDB.
        </p>

        <p>
          I enjoy learning new technologies and solving real-world problems.
        </p>

      </div>
    </div>
  );
}

export default About;