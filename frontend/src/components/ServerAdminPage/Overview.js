import { useState } from 'react'
import './Overview.css'

const Overview = ({serverInfo}) => {
  const [serverName, setServerName] = useState(serverInfo.name)

  return (
    <div className="server-overview">
      <div className="overview-header">
        Server Overview
      </div>

      <div className="overview-update-container">
        <div className="overview-image-container">
          <div className="overview-image-icon-container">
            
          </div>
          <div className="overview-image-upload-container">
            <div className="overview-instruction">
              We recommend an image of at least 512x512 for the server.
            </div>
            <div className="overview-button">
              Upload Image
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