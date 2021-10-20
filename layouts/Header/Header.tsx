import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Style.css';

const Header = () => {
  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', JSON.stringify('KO'));
  } // 혹시모를 기본값 설정

  const onClickKo = () => {
    localStorage.removeItem('language');
    localStorage.setItem('language', JSON.stringify('KO'));
    console.log(localStorage.getItem('language'));
    location.reload();
  };
  const onClickEn = () => {
    localStorage.removeItem('language');
    localStorage.setItem('language', JSON.stringify('EN'));
    console.log(localStorage.getItem('language'));
    location.reload();
  };
  return (
    <header className="Header">
      <div className="Contents">
        <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
          <img id="logo" src="/src/icon/USPOT로고.png" alt="USPOT" width="120" height="90" />
        </Link>
        <nav className="Navigation">
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
                <img id="home" src="/src/icon/home.png" alt="home" width="30" height="30" />
                HOME
              </Link>
            </li>
            <li>
              <Link to="/mypage" style={{ textDecoration: 'none', color: '#000000' }}>
                <img id="mypage" src="/src/icon/mypage.png" alt="mypage" width="30" height="30" />
                MYPAGE
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ textDecoration: 'none', color: '#000000' }}>
                <img id="login" src="/src/icon/mypage.png" alt="login" width="30" height="30" />
                로그인
              </Link>
            </li>
            <li>
              <button onClick={onClickKo}>KOR</button>
            </li>
            <li>
              <button onClick={onClickEn}>ENG</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
