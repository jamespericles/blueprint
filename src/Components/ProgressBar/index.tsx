import * as React from 'react'

interface ProgressBarProps {
  completed: number
}

const ProgressBar = ({ completed }: ProgressBarProps) => {
  const containerStyles = {
    height: 20,
    width: '95%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 50,
    // Position requires a type of Position | undefined, passing 'stick' as a string will not work
    position: 'sticky' as 'sticky' | undefined,
    top: 10,
    zIndex: 999,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: 'green',
    borderRadius: 'inherit',
    position: 'sticky' as 'sticky' | undefined,
    transition: 'width 500ms ease-in-out',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  )
}

export default ProgressBar
