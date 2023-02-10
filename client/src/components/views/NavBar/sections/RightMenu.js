/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Button } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../config';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  console.log(user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(res => {
      if (res.status === 200) {
        navigate("/login");
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Login</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Sign up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Button type="text" onClick={logoutHandler}>Logout</Button>
      </Menu>
    )
  }
}

export default RightMenu;