import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard Components/Dashboard';
import Profile from '../components/Dashboard Components/Profile';
import Signup from '../components/Signup';
import Todo from '../components/Todo';


const Routing = () => {
    
    // Error Page Function
  const style = {
    backgroundImage: 'url(data:image/jpeg;base64,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)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }
  const Page404 = () => {
    return (
      <div style={style}>
        <h1 style={{
          fontFamily: 'serif',
          fontSize: '4em',
          color: '#fff'
        }}>Error 404: PAGE NOT FOUND</h1>
      </div>
    )
  };
  // Error Page Function

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Page404 />} />
        <Route path='/dashboard/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default Routing;
