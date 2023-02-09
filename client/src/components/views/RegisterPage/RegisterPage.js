import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(Password !== ConfirmPassword) {
      return alert('비밀번호를 다시 확인해주세요.');
    }
  };
  
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input type='name' value={Name} onChange={onNameHandler} />
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />
        <label>Passoword</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <label>Confirm Passoword</label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <input type='submit' value='Sign up' />
      </form>
    </div>
  );
};

export default RegisterPage