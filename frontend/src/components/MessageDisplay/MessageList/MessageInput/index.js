import './MessageInput.css'

const MessageInput = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit")
  }

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="message-textarea-wrapper">
        <textarea 
          className="message-textarea"
          type="textarea"
          maxLength="2000"
          onChange={(e) => {
            e.target.style.height = "auto";
            const height = e.target.scrollHeight;
            e.target.style.height = `${height}px`;
          }}
          onKeyDown={(e) => {
            console.log(e.key)
            console.log(e.target)
          }}
        />
      </div>
    </form>
  )
}

export default MessageInput;