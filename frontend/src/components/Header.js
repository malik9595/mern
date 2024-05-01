import React, { useEffect, useState,  } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userData, login } from '../features/user';
const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const isLogin = useSelector((state) => state.user.login);
	const userDatas = useSelector((state) => state.user.userData);
	

	const logoutFunction = (e) => {
		e.preventDefault()
		localStorage.removeItem('token');
		dispatch(userData())
		window.location.reload()
		
	};

	return (
		<div className='header'>
			<h3>GoalSetter</h3>
			<span>{userDatas.userData?.username }</span>
			{/* {console.log(userDatas?.userData?.username)} */}
			<Link to='/'>Dashboard</Link>
			{!isLogin && <Link to='/login'>Login</Link>}
			{isLogin && <span onClick={logoutFunction}>Logout</span>}
			{!isLogin && <Link to='/registration'>Registration</Link>}
		</div>
	);
};

export default Header;
