import React from 'react'
import './signup.css'

const Signup = () => {
  return (
    <div className='signUpBox'>
      <div className="main">
        <input type="checkbox" id="chk" />

        <div className="signup">
          <form>
            <label htmlFor='chk'>Sign up</label>
            <input type="text" name="txt" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <div className="btnBox">
              <button>Sign up</button>
            </div>
            <div className="socailBox">
              
            </div>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor='chk'>Login</label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <div className="btnBox">
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
