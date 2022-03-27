import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { authCreateUserWithEmailAndPassword, authSignInWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework } from './loginManager';



function LogIn() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res , true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res , false);
      })
  }

  const handleResponse = (res , redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect) {
      history.replace(from);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      authCreateUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res , true);
        })
    }
    if (!newUser && user.email && user.password) {
      authSignInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res , true);
        })
    }
    e.preventDefault();
  }
  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);

      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  console.log(user);


  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome , {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" id="" onBlur={handleBlur} placeholder="Enter your name" />}
        <br />
        <br />
        <input type="text" name="email" id="" onBlur={handleBlur} placeholder="Enter your email" required />
        <br />
        <br />
        <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Enter your password" required />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully </p>}
    </div>
  );
}

export default LogIn;
