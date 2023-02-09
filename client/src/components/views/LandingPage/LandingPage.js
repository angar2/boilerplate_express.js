import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        axios.get('/')
        .then(res => console.log(res))
    }, []);

    const onClickHandler = () => {
      axios.get(`/api/user/logout`)
      .then(res => {
        if(res.data.success) {
          console.log(res)
        } else {
          alert('로그아웃에 실패했습니다.')
        }
      })
    };
  

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <h2>LandingPage</h2>
      <button onClick={onClickHandler}>
        Logout
      </button>
    </div>
  );
};

export default LandingPage