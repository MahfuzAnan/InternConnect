import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/useAuthcontext';
import { useLogout } from '../../hooks/useLogout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../services/helper';

const StuNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { userstudent } = useAuthContext();
  const { useradmin } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleToggleNav = () => {
    setShowNav(!showNav);
  };

  const handleClick = () => {
    logout();
    try {
      axios
        .get(`${BASE_URL}/InterConnect/admin/logout`)
        .then((response) => {
          console.log(response);
          navigate('/');
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log('server responded');
          } else if (error.request) {
            console.log('network error');
          } else {
            console.log(error);
          }
        });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const innernav = document.querySelector('.inner-nav');
    if (showNav === true) {
      innernav.style.left = '0px';
    } else {
      innernav.style.left = '-300px';
    }
  }, [showNav]);

  return (
    <div className={`adminnavbar ${showNav ? 'sticky' : ''}`}>
      <div
        className={`${showNav ? 'hamburger1' : 'hamburger'}`}
        onClick={handleToggleNav}
      ></div>
      <div className='logo'>
        <img
          src='Ourlogo.png'
          alt='InternConnect Logo'
          style={{ width: '150px', height: '150px' }}
        />
        <nav className='menu'>
          <ul className='inner-nav'>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/Student'>Dashboard</a>
            </li>
            <li>
              <a href='/SeeCompanies'>Company List </a>
            </li>
            <li>
              <a onClick={handleClick} href='/'>
                Log Out{' '}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className='button'
        style={{ fontSize: '20px', padding: '50px 60px', fontWeight: 'bold' }}
      >
        {(!userstudent && !useradmin) ? (
          <a href='/login'>Login</a>
        ) : null}
       {userstudent ? <a href='/Student'> <img src="stu.png"alt="InternConnect Logo"   style={{width: '40px', height: '40px' , marginBottom:"-10px" , marginRight:"10px" }}   />{userstudent.name}</a> : null}
        {useradmin ? <a href='/Admin'>{useradmin.name}</a> : null}
      </div>
    </div>
  );
};

export default StuNavbar;
