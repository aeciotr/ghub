import React from 'react';
import logoImg from '../../assets/logo.svg'
import './style.scss';

const Header: React.FC = () => {
  return (
    <>
      <header><img src={logoImg} alt="Github Explorer" /></header>
    </>
  );
}

export default Header;
