import { useDispatch, useSelector } from 'react-redux';
import '../ServerAdminPage/DeleteForm/DeleteForm.css'
import { getCurrentUser } from '../../store/session';
import { deleteMember, getMemberId } from '../../store/members';

const LeaveForm = ({serverId, serverName, onClose}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getCurrentUser);
  const memberId = useSelector(getMemberId(sessionUser.id))

  const handleDelete = (e) => {
    e.preventDefault();
    // dispatch delete membership and close all modals (redirect to home)
    dispatch(deleteMember(memberId));
  }

  return (
    <div className="delete-form">
      <div className="delete-form-header">
        Leave '{serverName}'
      </div>
      <div className="delete-form-text">
        Are you sure you want to leave <strong>{serverName}</strong>? 
        You won't be able to rejoin this server unless you are re-invited.
      </div>
      <div className="delete-form-options">
        <button className="reset-button cancel" onClick={onClose}>
          <div>Cancel</div>
        </button>
        <button className="submit-update-button delete" onClick={handleDelete}>
          <div>Leave Server</div>
        </button>
      </div>
    </div>
  )
}

export default LeaveForm;