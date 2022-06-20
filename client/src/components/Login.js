import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/login.css';


function login() {
  return (
    <form className='login_form'>
        <h1 className='login_header'>LOGIN WITH APPLE ID</h1>
        <hr/>
        <input type='text' id='appleID' placeholder='Apple ID'/>
        <Button variation='danger'>LOGIN</Button>
    </form>
  )
}

export default login
