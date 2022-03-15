import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './dashboard.css'

const Dashboard = () => {

  // Get User From localStorage
  const user = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  // Logout State
  const [logout, setLogout] = useState(false);


  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [logout]);

  const signOut = () => {
    localStorage.removeItem("currentUser");
    setLogout(true)
  }

  return (

    <div className='container-fluid Dashboard'>

      <Row className='sidebar'>
        <Col className='sideBox col-lg-3 col-md-4 col-sm-5'>
          <Col className="dashboard-title">
            <h1>Dashnoard</h1>
          </Col>
          <Col className='sideBar-list'>
            <Link className='sideBar-Btn' to="/dashboard/profile">Profile</Link>
          </Col>
          <Col className='sideBar-list'>
            <Link className='sideBar-Btn' to='/todo'>Todo</Link>
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
  )
}


export default Dashboard;
