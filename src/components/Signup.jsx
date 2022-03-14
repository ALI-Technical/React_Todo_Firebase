import React, { useEffect, useState } from 'react'
import './signup.css'
import { FaFacebook, FaGooglePlus } from 'react-icons/fa';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  // Signup States

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Login States

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const dbref = collection(db, "users");
  const navigate = useNavigate("");
  const user = localStorage.getItem("currentUser");
  // Sigbup Handler

  // Checking User
  useEffect( () => {
    if (user) {
      navigate("/dashboard")
    }
  }, [] )

  const signupHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const userObj = {
      userName,
      email,
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        // console.log(result);
        // console.log(result.user);
        await addDoc(dbref, { ...userObj, userUid: result.user.uid });



        setLoading(false);
        ////// Calling Toast //////
        toast.success('Signup Successfully, Now Login to Continue', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        /////// Calling Toast //////

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        /////// Calling Toast //////
        toast.error('Email Already Exists or Password is less than 5', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        /////// Calling Toast //////
      });
    setUserName("");
    setEmail("");
    setPassword("");

  }
  // Login Handler

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((user) => {
        // console.log(user);
        localStorage.setItem("currentUser", user.user.uid);
        setLoading(false);
        navigate("/dashboard");


        ////// Calling Toast //////
        toast.success('Logged In Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        /////// Calling Toast //////
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);



        /////// Calling Toast //////
        toast.error('Email or Password Wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        /////// Calling Toast //////
      })
  }
  return (
    <div className='signUpBox'>
      <div className="main">
        <input type="checkbox" id="chk" />

        <div className="signup">
          <form onSubmit={signupHandler}>
            <label htmlFor='chk'>Sign up</label>
            <input className='form-control' value={userName} type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User name" required />
            <input className='form-control' value={email} type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" required />
            <input className='form-control' value={password} type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" required />
            <div className="btnBox">
              {
                loading ? <Loader />
                  : (
                    <button>Sign Up</button>
                  )
              }
            </div>
            <aside className="socailBox">
              <FaFacebook cursor="pointer" color='#129AF6' size={30} />
              <FaGooglePlus cursor="pointer" color='red' size={30} />
            </aside>
          </form>
        </div>

        <div className="login">
          <form onSubmit={loginHandler}>
            <label htmlFor='chk'>Login</label>
            <input className='form-control' type="email" value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email" required />
            <input className='form-control' type="password" value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password" required />
            <div className="btnBox">
              {
                loading ? (
                  <div className="d-flex justify-content-center">
                    <div style={{color: "#573b8a"}} className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )
                  : (
                    <button>Login</button>
                  )
              }
            </div>
          </form>
        </div>
      </div>
      <ToastContainer closeButton={{
        display: "none"
      }} theme='dark' />
    </div>
  )
}

export default Signup;
