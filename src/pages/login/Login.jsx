import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import "./login.scss"

// import loginImg from '../images/login-img.svg';
const Login = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <div className='login'>
      <div className='container'>
        <img src="https://www.ge.com/research/sites/default/files/styles/hero_banner/public/images/capabilities/2020-07/powersystems-min.jpg?itok=OFD2LNP5" alt="Landing page image"/>
        <h1>Load Forecasting</h1>
        <button className='btn' onClick={loginWithRedirect}>Login / Signup</button>
      </div>
    </div>
  )
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
