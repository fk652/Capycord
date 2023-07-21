import './AboutMe.css';
import logo from "../../assets/capycord_icons/icon.png";

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="app-header">
        <div className="icon-container">
          <img className="icon" src={logo} alt=""/>
        </div>
        <div className="about-me-info">
          <h2 className="project-title">Capycord</h2>
          <h3 className="dev-name">By Fahim Khan</h3>
          <div className="nav-links">
            <a href="https://github.com/fk652/Capycord" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/fk652/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://fahim-khan.com/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-globe"></i>
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutMe;