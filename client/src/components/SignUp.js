import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/login.css';


function SignUp() {
  return (
    <form className='login_form'>
        <h1 className='login_header'>CREATE NEW APPLE ID</h1>
        <hr />
        <input type='text' id='email' placeholder='name@example.com' />
        <input type='text' id='fName' placeholder='First Name'/>
        <input type='text' id='lName' placeholder='Last Name' />
        <input type='date' id='bDate' placeholder='Birthdate' />
        <Button variation='danger'>SIGN UP</Button>
        <hr />
        <Button><a href='./Login.js'>LOGIN</a></Button>
    </form>
  )
}

export default SignUp
