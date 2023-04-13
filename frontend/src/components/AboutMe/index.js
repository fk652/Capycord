import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-me">
      <h2 class="project-title">Capycord</h2>
      <h3 class="dev-name">By Fahim Khan</h3>

      <div class="nav-links">
        <a href="https://github.com/fk652/Capycord">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/fk652/">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  )
}

export default AboutMe;