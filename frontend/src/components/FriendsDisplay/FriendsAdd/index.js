import "./FriendsAdd.css";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addErrors, getErrors, removeErrors } from "../../../store/errors";
import { createFriendRequest } from "../../../store/friendRequests";
import { getAddFriendResult, setAddFriendResult } from "../../../store/ui";
import { deleteSession } from "../../../store/session";

const FriendsAdd = () => {
  const errors = useSelector(getErrors);
  const friendResult = useSelector(getAddFriendResult);
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) dispatch(removeErrors());
    
    return dispatch(createFriendRequest(username))
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
      
      if (res.status === 401) dispatch(deleteSession())
      else if (errors && errors.duplicate) dispatch(setAddFriendResult(true));
    });
  }

  const dispatch = useDispatch();
  let ref = useRef();
  useEffect(() => {
    if (errors) dispatch(removeErrors());

    ref.button = document.querySelector(".add-friend-button");
    const input = document.querySelector(".add-friend-input");
    const inputContainer = document.querySelector(".add-friend-input-container");
    
    input.addEventListener("focus", () => {
      console.log(errors, errors?.error);
      errors?.error 
        ? inputContainer.style.borderColor = "#fa777c"
        : errors?.duplicate || friendResult
            ? inputContainer.style.borderColor = "#2dc770"
            : inputContainer.style.borderColor = "#00a8fc"
    })

    input.addEventListener("focusout", () => {
      errors?.error 
        ? inputContainer.style.borderColor = "#fa777c"
          : errors?.duplicate || friendResult
            ? inputContainer.style.borderColor = "#2dc770"
            : inputContainer.style.borderColor = "#1e1f22"
    })

    return () => {
      dispatch(setAddFriendResult(false));
      if (errors) dispatch(removeErrors());
    }
  }, [dispatch])

  const handleChange = (e) => {
    e.target.value ? ref.button.disabled = false : ref.button.disabled = true;
    setUsername(e.target.value);
    if (errors) dispatch(removeErrors());
    if (friendResult) dispatch(setAddFriendResult(false));
  }

  const getStatus = () => {
    if (errors && errors.error) return 'error';
    else if ((errors && errors.duplicate) || friendResult) {
      return 'success';
    }
    else return '';
  }

  return (
    <div className="add-friend-wrapper">
      <h2 className="add-friend-title">ADD FRIEND</h2>

      <form className="add-friend-form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="add-friend-form-span">
          You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
        </div>
        <div className={`add-friend-input-container ${getStatus()}`}>
          <div className="add-friend-input-wrapper">
            <input 
              className="add-friend-input" 
              type="text"
              placeholder="Enter a Username#0000"
              value={errors?.duplicate || friendResult ? '' : username}
              onChange={handleChange}
            />
          </div>
          <button className="add-friend-button" type="submit" disabled>
            Send Friend Request
          </button>
        </div>
        {
          errors?.error 
            ? <div className="add-friend-result error">
                {errors.error}
              </div>
            : errors?.duplicate || friendResult
              ? <div className="add-friend-result success">
                  Success! Your friend request to 
                  <span className="bold"> {username} </span> 
                  was sent.
                </div>
              : ''
        }
      </form>
    </div>
  )
}

export default FriendsAdd;