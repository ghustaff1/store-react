import React from 'react'

const GreenLink = ({underline, value}) => {
  const style={
    fontSize: '15px',
    color:'#6A983C',
    textDecoration:underline?'underline':'none',
  }
  return (
    <a style={style} href="#">{value}</a>
  )
}

export default GreenLink;