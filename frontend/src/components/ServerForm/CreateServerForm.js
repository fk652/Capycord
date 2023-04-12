import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrors } from '../../store/errors';
import { getServerSlide, setServerFormPage, setServerFormSlide, setShowServerModal } from '../../store/ui';
import './ServerForm.css';

const CreateServerForm = () => {
  const slide = useSelector(getServerSlide);
  const errors = useSelector(getErrors);
  const sessionUser = useSelector(state => state.session.user);
  const username = sessionUser.username.split('#')[0];
  const [input, setInput] = useState(`${username}'s server`);

  const dispatch = useDispatch();
  const closeForm = (e) => {
    e.preventDefault();
    dispatch(setShowServerModal(false));
    dispatch(setServerFormPage("start"));
    dispatch(setServerFormSlide(''));
  }

  const handleBack = () => {
    dispatch(setServerFormPage("start"));
    dispatch(setServerFormSlide("right"))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");

  }

  return (
    <div className={`server-form join-create ${slide}`}>
      <div className="server-form-header create">
        <h1>
          Customize your server
        </h1>
        <div className="server-form-subtext">
          Give your new server a personality with a name and an icon.
          You can always change it later.
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

      <form className="server-form-input-wrapper" onSubmit={handleSubmit}>
        <h2 className={`input-label bold ${errors?.error ? "error" : ""}`}>
          SERVER NAME
          {
            errors?.error
              ? <span className="error-message server"> - {errors.error}</span>
              : null
          }
        </h2>
        
        <input 
          type="text" 
          className="server-form-input" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <div className="helper-text small">
          By creating a server, you agree to love capybaras 💖
        </div>
      </form>

      <div className="server-form-footer">
        <div className="back-link create" onClick={handleBack}>
          Back
        </div>

        <button className="server-form-submit" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  )
}

export default CreateServerForm;