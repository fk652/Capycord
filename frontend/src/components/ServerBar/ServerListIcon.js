const ServerListIcon = ({id, image_url}) => {

  return (
    <>
      <div 
        id={id}
        data-key={id}
        className={`server-icon-wrapper`} 
      >
        <img 
          className="server-icon"
          src={image_url}
          alt="server-icon"
          data-key={id}
        />
      </div>
      <div className="tab-selector-wrapper">
        <span className="tab-selector" />
      </div>
    </>
  )
}

export default ServerListIcon;