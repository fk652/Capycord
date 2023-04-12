import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addErrors, getErrors, removeErrors } from '../../store/errors';
import { createServer } from '../../store/servers';
import { getCurrentUser } from '../../store/session';
import { getNewServer, getServerSlide, setServerFormPage, setServerFormSlide, setShowServerModal } from '../../store/ui';
import './ServerForm.css';

const CreateServerForm = () => {
  const slide = useSelector(getServerSlide);
  const sessionUser = useSelector(getCurrentUser);
  const newServer = useSelector(getNewServer);
  const username = sessionUser.username.split('#')[0];
  const errors = useSelector(getErrors);
  const [name, setName] = useState(`${username}'s server`);
  const [pictureUrl, setPictureUrl] = useState('')

  useEffect(() => {
    const inputEle = document.querySelector('.server-form-input');
    inputEle.focus();

    return () => {
      if (errors) dispatch(removeErrors());
    }
  }, [])

  useEffect(() => {
    if (newServer) {
      dispatch(setServerFormSlide("close"));

      setTimeout(() => {
        dispatch(setShowServerModal(false));
        dispatch(setServerFormPage("start"));
        dispatch(setServerFormSlide("expand"));
      }, 200)
    }
  }, [newServer])

  const dispatch = useDispatch();
  const closeForm = (e) => {
    e.preventDefault();
    dispatch(setServerFormSlide("close"));

    setTimeout(() => {
      dispatch(setShowServerModal(false));
      dispatch(setServerFormPage("start"));
      dispatch(setServerFormSlide("expand"));
    }, 200)
  }

  const handleBack = () => {
    dispatch(setServerFormPage("start"));
    dispatch(setServerFormSlide("left"))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) dispatch(removeErrors());

    const server = {
      name,
      pictureUrl,
      ownerId: sessionUser.id 
    }

    dispatch(createServer(server))
    .catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }

      const errors = {
        status: res.status,
        messages: null
      }
      if (data?.errors) errors.messages = data.errors;
      dispatch(addErrors(errors));
    });
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
        <h2 className={`input-label bold ${errors ? "error" : ""}`}>
          SERVER NAME
          {
            errors
              ? <span className="error-message server"> - {Object.values(errors)}</span>
              : null
          }
        </h2>
        
        <input 
          type="text" 
          className="server-form-input" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
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