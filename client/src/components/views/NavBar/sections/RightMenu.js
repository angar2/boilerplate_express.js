import React from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`/api/user/logout`).then(res => {
      if (res.data.success) {
        navigate('/');
      } else {
        alert('로그아웃에 실패했습니다.');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
        <div>
          <a href="/login">Login</a>
          <a href="/register">Signup</a>
        </div>
    );
  } else {
    return (
        <div>
          <button onClick={logoutHandler}>Logout</button>
        </div>
    );
  };
};

export default RightMenu;