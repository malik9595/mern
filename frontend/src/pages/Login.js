import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, userData } from '../features/user';
import axios from 'axios';
const Login = () => {
	const dispatch = useDispatch();
	const INITIAL_VALUE = { email: '', password: '' };
	const [data, setData] = useState(INITIAL_VALUE);
	const { email, password } = data;
	const [res, setRes] = useState();
	const user = useSelector((state) => state.user.userData);
	const navigate = useNavigate();
	

	const inputsChange = (e) => {
		e.preventDefault()
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const submitFunction=async(e)=>{
		e.preventDefault()
		setData(INITIAL_VALUE)
		const response = await axios.post('/login', data);
		if (response.data) {
			localStorage.setItem('token', `${response.data.token}`);
			dispatch(userData(response.data));
			dispatch(login());
			navigate('/');
		}
	}
	// console.log(data);

	return (
		<div className='login'>
			<h1>Login</h1>
			<form>
				<input
					type='email'
					name='email'
					value={email}
					placeholder='Email'
					onChange={(e) => inputsChange(e)}
				/>
				<input
					type='password'
					name='password'
					value={password}
					placeholder='Password'
					onChange={(e) => inputsChange(e)}
				/>
				<input
					type='submit'
					placeholder='Submit Now'
					onClick={submitFunction}
				/>
			</form>
			<p>{user?.username}</p>
			<p>{user?.email}</p>
			<p>{user?.password}</p>
		</div>
	);
};

export default Login;
