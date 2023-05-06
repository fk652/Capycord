import './DeleteForm.css'

const DeleteForm = ({serverId, onClose}) => {
  const currentServerName = document.querySelector('.admin-sidebar-option-header').innerText;

  const handleDelete = (e) => {
    e.preventDefault();
    // dispatch delete server and close all modals (redirect to home)
  }

  return (
    <div className="delete-form">
      <div className="delete-form-header">
        Delete '{currentServerName}'
      </div>
      <div className="delete-form-text">
        Are you sure you want to delete <strong>{currentServerName}</strong>? 
        This action cannot be undone.
      </div>
      <div className="delete-form-options">
        <button className="reset-button cancel" onClick={onClose}>
          <div>Cancel</div>
        </button>
        <button className="submit-update-button delete" onClick={handleDelete}>
          <div>Delete Server</div>
        </button>
      </div>
    </div>
  )
}

export default DeleteForm;