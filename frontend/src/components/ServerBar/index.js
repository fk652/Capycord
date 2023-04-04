import './ServerBar.css';
import { useDispatch, useSelector } from "react-redux";
import { getSelectedServer, setSelectedServer } from '../../store/ui';
import { Link, Redirect, useHistory } from "react-router-dom";
import ServerListIcon from './ServerListIcon';

const ServerBar = () => {
  const selected = useSelector(getSelectedServer);
  const history = useHistory();

  const dispatch = useDispatch();
  const toggleSelected = (e) => {
    // console.log(e);
    // console.log(e.target.dataset.key);
    // console.log("parent", e.target.parentNode.id);
    // console.log("grandparent", e.target.parentNode.parentNode.id);

    if (e.target.dataset.key) {
      dispatch(setSelectedServer(e.target.dataset.key));
      history.push(`/${e.target.dataset.key}`);  // might change to wrap links around server-icon-wrappers
    }
  }

  const checkSelected = (id) => {
    if (selected === id.toString()) return "selected"
    return ""
  }

  return (
    <div className="server-bar" onClick={toggleSelected}>
      <div className={`server-item-wrapper ${checkSelected("home")}`}>
        {/* <Link to="/home"> */}
        <div 
          id="home"
          data-key="home"
          className="server-icon-wrapper home-icon-wrapper" 
        >
          <svg data-key="home" className="home-icon" width="28" height="20" viewBox="0 0 28 20">
            <path data-key="home" fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z">
            </path>
          </svg>
        </div>
        <div className="tab-selector-wrapper">
          <span className="tab-selector" />
        </div>
        {/* </Link> */}
      </div>

      <div className="server-divider" />

      <div className={`server-item-wrapper ${checkSelected(1)}`}>
        <ServerListIcon id="1" image_url="https://pbs.twimg.com/profile_images/1076326143660298245/iaMMNWg9_400x400.jpg" />
      </div>

      <p>ServerBar</p>
      <p>
        <br />
        Is there a character that could even possibly EVEN TOUCH Madara Uchiha? Let alone defeat him. And I'm not talking about Edo Tensei Uchiha Madara. I'm not talking about Gedou Rinne Tensei Uchiha Madara either. Hell, I'm not even talking about Juubi Jinchuuriki Gedou Rinne Tensei Uchiha Madara with the Eternal Mangekyou Sharingan and Rinnegan doujutsus (with the rikodou abilities and being capable of both Amateratsu and Tsukuyomi genjutsu), equipped with his Gunbai, a perfect Susano'o, control of the juubi and Gedou Mazou, with Hashirama Senju's DNA implanted in him so he has mokuton kekkei genkai and can perform yin yang release ninjutsu while being an expert in kenjutsu and taijutsu.
        I’m also not talking about Kono Yo no Kyūseishu Futarime no Rikudō Juubi Jinchuuriki Gedou Rinne Tensei Uchiha Madara with the Eternal Mangekyou Sharingan (which is capable of Enton Amaterasu, Izanagi, Izanami and the Tsyukuyomi Genjutsu), his two original Rinnegan (which grant him Chikushōdō, Shuradō, Tendō, Ningendō, Jigokudō, Gakidō, Gedō, Banshō Ten’in, Chibaku Tensei, Shinra Tensei, Tengai Shinsei and Banbutsu Sōzō) and a third Tomoe Rinnegan on his forehead, capable of using Katon, Fūton, Raiton, Doton, Suiton, Mokuton, Ranton, Inton, Yōton and even Onmyōton Jutsu, equipped with his Gunbai(capable of using Uchihagaeshi) and a Shakujō because he is a master in kenjutsu and taijutsu, a perfect Susano’o (that can use Yasaka no Magatama ), control of both the Juubi and the Gedou Mazou, with Hashirama Senju’s DNA and face implanted on his chest, his four Rinbo Hengoku Clones guarding him and nine Gudōdama floating behind him AFTER he absorbed Senjutsu from the First Hokage, entered Rikudō Senjutsu Mode, cast Mugen Tsukuyomi on everybody and used Shin: Jukai Kōtan so he can use their Chakra while they are under Genjutsu. I'm definitely NOT Talking about sagemode sage of the six paths Juubi Jinchuuriki Gedou Rinne Tensei Super Saiyan 4 Uchiha Madara with the Eternal Mangekyou Sharingan, Rinnegan, Mystic Eyes of Death Perception, and Geass doujutsus, equipped with Shining Trapezohedron while casting Super Tengen Toppa Gurren Lagann as his Susanoo, controlling the Gold Experience Requiem stand, having become the original vampire after Alucard, able to tap into the speedforce, wearing the Kamen Rider Black RX suit and Gedou Mazou, with Hashirama Senju's DNA implanted in him so he has mokuton kekkei genkai and can perform yin yang release ninjutsu while being an expert in kenjutsu and taijutsu and having eaten Popeye's spinach. I'm talking about sagemode sage of the six paths Juubi Jinchuuriki Gedou Rinne Tensei Legendary Super Saiyan 4 Uchiha Madara with the Eternal Mangekyou Sharingan, Rinnegan, Mystic Eyes of Death Perception, and Geass doujutsus, equipped with his Shining Trapezohedron while casting Super Tengen Toppa Gurren Lagann as his Susanoo, controlling the Gold Experience Requiem stand, having become the original vampire after having absorbed Alucard as well as a God Hand, able to tap into the speedforce, wearing the Kamen Rider Black RX suit, with Kryptonian DNA implanted in him and having eaten Popeye's spinach while possessing quantum powers like Dr. Manhattan and having mastered Hokuto Shinken.
      </p>

    </div>
  )
}

export default ServerBar;