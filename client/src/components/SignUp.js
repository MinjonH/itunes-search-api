import React from 'react';
import '../styles/login.css';

function SignUp() {
  return (
    <div className='body'>
      <form className='login_form'>
          <h1>CREATE NEW APPLE ID</h1>
          <hr />
          <input type='text' id='email' placeholder='name@example.com' />
          <input type='text' id='fName' placeholder='First Name'/>
          <input type='text' id='lName' placeholder='Last Name' />
          <input type='date' id='bDate' placeholder='Birthdate' />
          <button className='signUp_Btn'>SIGN UP</button>
          <hr />
          <a id='login_Btn' href='./Login.js'>Login</a>
      </form>
    </div>
  )
}

export default SignUp
