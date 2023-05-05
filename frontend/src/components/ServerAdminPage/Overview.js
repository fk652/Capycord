import { useState } from 'react'
import './Overview.css'
import { useEffect } from 'react';

const Overview = ({serverInfo}) => {
  console.log(serverInfo);
  const [serverName, setServerName] = useState(serverInfo.name);
  const [picture, setPicture] = useState();
  const [picturePreview, setPicturePreview] = useState();
  const [imageRemoved, setImageRemoved] = useState(false);

  useEffect(() => {
    if (!picture) return;

    const pictureObject = URL.createObjectURL(picture);
    setPicturePreview(pictureObject);

    return () => URL.revokeObjectURL(pictureObject);
  }, [picture])

  const handleImageRemove = (e) => {
    e.preventDefault();
    setPicture('');
    setImageRemoved(true);
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    serverInfo = {
      pictureUrl: picture || serverInfo.pictureUrl, // can also make server update controller ignore null
      name: serverName
    }

    // dispatch update action
  }

  const handleImageInput = (e) => {
    e.preventDefault();
    setPicture(e.target.files[0]);
    setImageRemoved(false)
  }

  const imageInput = (
    <input 
      className="server-form-image-input" 
      type="file" 
      accept=".jpg,.jpeg,.png,.gif" 
      onChange={handleImageInput}
      // disabled
    />
  )

  return (
    <div className="server-overview">
      <div className="overview-header">
        Server Overview
      </div>

      <div className="overview-update-container">
        <div className="overview-image-container">
          <div className="overview-image-icon-container">
            <div className="overview-image-icon-wrapper">
              {
                (serverInfo.pictureUrl || picture) && !imageRemoved
                ? <div className="overview-image-preview" style={{backgroundImage: `url(${picturePreview || serverInfo.pictureUrl})`}} alt=''>
                    {imageInput}
                  </div>
                : <div className="server-icon filler overview">
                    {serverInfo.name[0].toUpperCase()}
                    {imageInput}
                  </div>
              }
              <div className={`image-change-text ${
                (serverInfo.pictureUrl || picture) && !imageRemoved
                ? 'no-icon'
                : ''
              }`}>
                Change<br />Icon
              </div>
              <div className="image-upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
                  <g fill="none" fillRule="evenodd">
                    <path d="m0 0h18v18h-18z"/>
                    <path d="m13.5 8.25v4.5c0 .8284271-.6715729 1.5-1.5 1.5h-10.5c-.82842712 0-1.5-.6715729-1.5-1.5v-10.5c0-.82842712.67157288-1.5 1.5-1.5h7.5-3v1.5h-4.5v10.5h10.5v-4.5zm-5.28-.5325 2.655 3.5325h-8.25l2.0625-2.6475 1.47 1.77zm3.78-5.4675h2.25v1.5h-2.25v2.25h-1.5v-2.25h-2.25v-1.5h2.25v-2.25h1.5z" fill="#4f545c" transform="translate(2.25 1.5)"/>
                  </g>
                </svg>
              </div>
            </div>
            {
              (serverInfo.pictureUrl || picture) && !imageRemoved
                ? <div className="remove-image-link" onClick={handleImageRemove}>Remove</div>
                : <div className="image-text-helper">Minimum Size: <strong>128x128</strong></div>
            }
          </div>
          <div className="overview-image-upload-container">
            <div className="overview-instruction">
              We recommend an image of at least 512x512 for the server.
            </div>
            <div className="overview-button">
              Upload Image
              {imageInput}
            </div>
          </div>
        </div>

        <div className="overview-server-name-container">
          <div className="overview-option-label">
            Server Name
          </div>
          <input 
            className="overview-input"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)} 
          />
        </div>
      </div>
    </div>
  )
}

export default Overview;