import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {

  const user = localStorage.getItem("currentUser");
  const navigate = useNavigate("");
  const [logout, setLogout] = useState(false);

  const signOut = () => {
    localStorage.removeItem("currentUser");
    setLogout(true)
  }

  return (
    <div className='profile-page'>
          <div className='container-fluid Dashboard'>

<Row className='sidebar'>
  <Col className='sideBox col-lg-3 col-md-4 col-sm-5'>
    <Col className="title">
      <h1>Dashnoard</h1>
    </Col>
    <Col className='sideBar-list'>
      <Link className='sideBar-Btn' to="/dashboard/profile">Profile</Link>
    </Col>
    <Col className='sideBar-list'>
      <Link className='sideBar-Btn' to='/dashboard/todo'>Todo</Link>
    </Col>
    <Col className='sideBar-list'>
      <Link className='sideBar-Btn' to='/dashboard/logout'>Products</Link>
    </Col>
    <Col className='sideBar-list logoutBox'>
      <button className='btn btn-primary' onClick={signOut}>
        Logout
      </button>
    </Col>
  </Col>
</Row>
</div>

    </div>
  )
}

export default Profile
