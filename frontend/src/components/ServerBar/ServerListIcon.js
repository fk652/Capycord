const ServerListIcon = ({id, image_url, name}) => {

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
        <span class="tooltip">{name}</span>
      </div>
      <div className="tab-selector-wrapper">
        <span className="tab-selector" />
      </div>
    </>
  )
}

export default ServerListIcon;