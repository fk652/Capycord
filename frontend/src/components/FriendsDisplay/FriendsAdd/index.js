import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./FriendsAdd.css";

const FriendsAdd = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    // will dispatch friend request here later
  }
  
  let ref = useRef();
  useEffect(() => {
    ref.button = document.querySelector(".add-friend-button");
    const input = document.querySelector(".add-friend-input");
    const inputContainer = document.querySelector(".add-friend-input-container");
    input.addEventListener("focus", () => {
      inputContainer.style.borderColor = "#00a8fc";
    })
    input.addEventListener("focusout", () => {
      inputContainer.style.borderColor = "#1e1f22";
    })
  }, [])

  const [username, setUsername] = useState('');
  const handleChange = (e) => {
    e.target.value ? ref.button.disabled = false : ref.button.disabled = true;
    setUsername(e.target.value);
  }

  return (
    <div className="add-friend-wrapper">
      <h2 className="add-friend-title">ADD FRIEND</h2>

      <form className="add-friend-form" autoComplete="off" onSubmit={handleSubmit}>
        <span className="add-friend-form-span">
          You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
        </span>
        <div className="add-friend-input-container">
          <div className="add-friend-input-wrapper">
            <input 
              className="add-friend-input" 
              type="text"
              placeholder="Enter a Username#0000"
              value={username}
              onChange={handleChange}
            />
          </div>
          <button className="add-friend-button" type="submit" disabled>
            Send Friend Request
          </button>
        </div>
      </form>
    </div>
  )
}

export default FriendsAdd;