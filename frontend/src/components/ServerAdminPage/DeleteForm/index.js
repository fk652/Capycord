import './DeleteForm.css'
import { useDispatch } from 'react-redux';
import { deleteServer } from '../../../store/servers';
import { deleteChannel } from '../../../store/channels';

const DeleteForm = ({serverInfo, channelInfo, onClose, adminClose}) => {
  const dispatch = useDispatch();

  const nameInput = document.getElementById('server-name-change');
  const currentName = nameInput ? nameInput.value
                                : document.querySelector('.admin-sidebar-option-header').innerText;

  const handleDelete = (e) => {
    e.preventDefault();
    onClose();
    adminClose();
    channelInfo ? dispatch(deleteChannel(channelInfo.id)) : dispatch(deleteServer(serverInfo.id));
  }

  return (
    <div className="delete-form">
      <div className="delete-form-header">
        {
          channelInfo ? `Delete Channel`
                      : `Delete '${currentName}'`
        }
      </div>
      <div className="delete-form-text">
        Are you sure you want to delete <strong>{channelInfo ? '#' : ''}{currentName}</strong>? 
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