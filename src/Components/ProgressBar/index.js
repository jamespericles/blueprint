const ProgressBar = ({ completed }) => {

  const containerStyles = {
    height: 20,
    width: '95%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 50,
    position: 'sticky',
    top: 10,
    zIndex: 999,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: 'green',
    borderRadius: 'inherit',
    position: 'sticky',
    transition: 'width 500ms ease-in-out'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;