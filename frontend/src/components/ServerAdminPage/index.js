import { useDispatch, useSelector } from 'react-redux';
import './ServerAdminPage.css'
import { getServerAdminTab, setServerAdminTab, setServerFormPage, setServerFormSlide } from '../../store/ui';
import { useEffect } from 'react';
import { ServerFormModal } from '../../context/Modal';
import { useState } from 'react';
import DeleteForm from './DeleteForm';
import Overview from './Overview';

const ServerAdminPage = ({serverInfo, onClose}) => {
  const selectedTab = useSelector(getServerAdminTab);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const adminOptions = document.querySelectorAll('.admin-sidebar-option');
  let selectedOption = null;
  adminOptions.forEach(option => {
    if (option.innerHTML === selectedTab) {
      selectedOption = option;
      selectedOption.classList.add('selected')
    }
  })

  // document.title = `Capycord | ${selectedTab} | ${serverInfo.name}`
  
  useEffect(() => {
    return () => dispatch(setServerAdminTab("Overview"));
  }, [])

  const getAdminContent = () => {
    switch (selectedTab) {
      case "Overview":
        return (
          <Overview serverInfo={serverInfo} />
        )
      default:
        return null;
    }
  }

  const handleOptionClick = (e) => {
    e.preventDefault();
    const tabName = e.target.innerText;
    if (tabName !== selectedTab) {
      selectedOption.classList.remove('selected');
      dispatch(setServerAdminTab(tabName));
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  const closeForm = () => {
    dispatch(setServerFormSlide("close"));

    setTimeout(() => {
      setShowModal(false);
      dispatch(setServerFormPage("start"));
      dispatch(setServerFormSlide("expand"));
    }, 200)
  }

  return (
    <div className="admin-page-wrapper">
      <div className="admin-sidebar-wrapper">
        <div className="admin-sidebar">
          <div className="admin-sidebar-options-wrapper">
            <div className="admin-sidebar-option-header">
              {serverInfo.name}
            </div>
            <div 
              className="admin-sidebar-option"
              onClick={handleOptionClick}
            >
              Overview
            </div>

            {/* <div 
              className="admin-sidebar-option"
              onClick={handleOptionClick}
            >
              Example
            </div> */}

            <div className="admin-sidebar-divider" />
            <div 
              className="admin-sidebar-option icon-option"
              onClick={handleDelete}
            >
              Delete Server
              <svg role="img" width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z">
                </path>
                <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-content-wrapper">
        <div className="admin-content">
          {getAdminContent()}
        </div>
        <div className="admin-escape-option-wrapper">
          <div 
            className="admin-escape-option"
            onClick={onClose}
          >
            <div className="escape-icon-container">
              <svg role="img" width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
                </path>
              </svg>
            </div>
            <div className="escape-text">
              ESC
            </div>
          </div>
        </div>
        {/* <div className="submit-reset-container">
          <div className="submit-reset-wrapper">
            <div className="submit-reset">
              <div className="submit-reset-text">
                Careful — you have unsaved changes!
              </div>
              <div className="submit-reset-options">

              </div>
            </div>
          </div>
        </div> */}
      </div>

      {showModal && (
        <ServerFormModal onClose={closeForm}>
          <DeleteForm serverId={serverInfo.id} onClose={closeForm}/>
        </ServerFormModal>
      )}
    </div>
  )
}

export default ServerAdminPage;