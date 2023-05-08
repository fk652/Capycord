import { useDispatch } from 'react-redux';
import './DeleteForm.css'
import { deleteServer } from '../../../store/servers';

const DeleteForm = ({serverId, onClose, adminClose}) => {
  let currentServerName;
  const nameInput = document.getElementById('server-name-change');
  if (nameInput) currentServerName = nameInput.value;
  else currentServerName = document.querySelector('.admin-sidebar-option-header').innerText;

  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    onClose();
    adminClose();
    dispatch(deleteServer(serverId));
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