import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userData, login} from '../features/user';
import axios from 'axios';
import { INITIAL_VALUE } from '../app/data';

const Registration = () => {
	const [data, setData] = useState(INITIAL_VALUE);
	const { username, email, password, confirmPassword } = data;
	const dispatch = useDispatch();
	const userData_redux = useSelector((state) => state.user.userData);
	const navigate = useNavigate()

	const inputsChange = (e) => {
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const submitFunction = async (e) => {
		e.preventDefault();
		setData(INITIAL_VALUE);
		const response = await axios.post('/register', data);

		if (response.data) {
			localStorage.setItem('token', `${response.data.token}`);
			dispatch(userData(response.data));
			dispatch(login());
			navigate('/')
		}
	};

	return (
		<div className='registration'>
			<h1>Registration</h1>
			<form>
				<input
					type='text'
					name='username'
					value={username}
					placeholder='Username'
					onChange={(e) => inputsChange(e)}
				/>
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
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					placeholder='confirm Password'
					onChange={(e) => inputsChange(e)}
				/>
				<input
					type='submit'
					placeholder='Submit Now'
					onClick={submitFunction}
				/>
			</form>
		</div>
	);
};

export default Registration;
