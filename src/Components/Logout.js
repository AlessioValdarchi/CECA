import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate= useNavigate()
    setTimeout(()=> {navigate('/'), window.location.reload(false)},1000)
  return (
    <div>Logged Out</div>
  )
}

export default Logout