const ServerListIcon = ({id, image, name}) => {
  return (
    <>
      <div 
        id={id}
        data-key={id}
        className={`server-icon-wrapper`} 
      >
        {
          image 
            ? <img 
                className="server-icon"
                src={image}
                alt="server-icon"
                data-key={id}
              />
            : <div className="server-icon filler">{name[0].toUpperCase()}</div>
        }
      </div>
      <div className="tab-selector-wrapper">
        <span className="tab-selector" />
      </div>
    </>
  )
}

export default ServerListIcon;