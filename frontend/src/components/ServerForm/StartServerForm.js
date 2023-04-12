import './ServerForm.css';
import joinIcon from "../../assets/server_form_icons/join_icon.svg";
import createIcon from "../../assets/server_form_icons/create_icon.svg";
import choiceArrow from "../../assets/server_form_icons/choice_arrow.svg";
import { useDispatch } from 'react-redux';
import { setServerFormPage, setShowServerModal } from '../../store/ui';

const StartServerForm = () => {
  const dispatch = useDispatch();
  const closeForm = (e) => {
    e.preventDefault();
    dispatch(setShowServerModal(false));
    dispatch(setServerFormPage('start'));
  }

  return (
    <div className="server-form">
      <div className="server-form-header">
        <h1>
          Add a server
        </h1>
        <div className="server-form-subtext">
          Your server is where you and your friends hang out.
          Make yours and start talking.
        </div>
        <div 
          className="server-form-close" 
          onClick={closeForm}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
            </path>
          </svg>
        </div>
      </div>

      <div 
        className="choice-container" 
        onClick={() => dispatch(setServerFormPage('create'))}
      >
        <img className="choice-icon" alt="" src={createIcon} />
        <div className="choice-text">
          Create My Own
        </div>
        <div className="choice-arrow">
          <img alt="" src={choiceArrow} />
        </div>
      </div>

      <div className="server-form-subtext">
        Have an invite already?
      </div>

      <div 
        className="choice-container"
        onClick={() => dispatch(setServerFormPage('join'))}
      >
        <img className="choice-icon" alt="" src={joinIcon} />
        <div className="choice-text">
          Join a Server
        </div>
        <div className="choice-arrow">
          <img alt="" src={choiceArrow} />
        </div>
      </div>
    </div>
  )
}

export default StartServerForm;