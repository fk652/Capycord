import '../../ServerAdminPage/DeleteForm/DeleteForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const CreateChannelForm = ({serverId, onClose}) => {
  const dispatch = useDispatch();

  const [type, setType] = useState('text');
  const [name, setName] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    onClose();
    dispatch();
  }

  return (
    <div className="delete-form">
      <div className="delete-form-header">
        Create Channel
        <div className="cancel-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
            </path>
          </svg>
        </div>
      </div>
      
      <div className="delete-form-options">
        <button className="reset-button cancel" onClick={onClose}>
          <div>Cancel</div>
        </button>
        <button className="submit-update-button create" onClick={handleCreate} disabled>
          <div>Create Channel</div>
        </button>
      </div>
    </div>
  )
}

export default CreateChannelForm;