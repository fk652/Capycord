import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrors } from '../../store/errors';
import { getServerSlide, setServerFormPage, setServerFormSlide, setShowServerModal } from '../../store/ui';
import './ServerForm.css';

const JoinServerForm = () => {
  const slide = useSelector(getServerSlide);
  const errors = useSelector(getErrors);
  const [input, setInput] = useState('');

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
    console.log("submit");
  }

  return (
    <div className={`server-form join-create ${slide}`}>
      <div className="server-form-header">
        <h1>
          Join a Server
        </h1>
        <div className="server-form-subtext small">
          Enter a server id below to join an existing server
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
        <h2 className={`input-label ${errors?.error ? "error" : ""}`}>
          SERVER ID NUMBER
          {
            errors?.error
              ? <span className="error-message server"> - {errors.error}</span>
              : <span className="required">*</span>
          }
        </h2>
        
        <input 
          type="text" 
          className="server-form-input" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <div className="helper-text">
          Demo server ids should range from 1-12
        </div>

        <div className="helper-text">
          Server ids can also be found in the url link (e.g: /server/:server_id)
        </div>
      </form>

      <div className="server-form-footer">
        <div className="back-link" onClick={handleBack}>
          Back
        </div>

        <button className="server-form-submit" onClick={handleSubmit}>
          Join Server
        </button>
      </div>
    </div>
  )
}

export default JoinServerForm;