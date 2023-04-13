import './AboutMe.css';
import dummyIcon from "../../assets/icon.png";

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="icon-container">
        <img className="icon" src={dummyIcon} alt=""/>
      </div>

      <div className="about-me-info">
        <h2 className="project-title">Capycord</h2>
        <h3 className="dev-name">By Fahim Khan</h3>

        <div className="nav-links">
          <a href="https://github.com/fk652/Capycord">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/fk652/">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutMe;