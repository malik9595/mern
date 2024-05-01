import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddGoal = () => {
	const dispatch = useDispatch();
	const INITIAL_VALUE = { title: '', desc: '' };
	const [data, setData] = useState(INITIAL_VALUE);
	const { title, desc } = data;
	const [response, setResonse] = useState('');
	// const decodeId = jwt.verify(token, process.env.JWT_SECRET);
	const inputsChange = (e) => {
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const submitFunction = async (e) => {
		e.preventDefault();
		console.log(data);
		const token = localStorage.getItem('token');
		console.log(token);
		const config = { headers: { Authorization: `Bearer ${token}` } };
		axios
			.post('/api', data, config)
			.then((ans) => console.log(ans.data))
			.catch((err) => console.log(err.message));
		setData(INITIAL_VALUE);
	};
	return (
		<div>
			AddGoal
			<form>
				<input
					type='text'
					name='title'
					value={title}
					placeholder='Title'
					onChange={(e) => inputsChange(e)}
				/>
				<input
					type='text'
					name='desc'
					value={desc}
					placeholder='Description'
					onChange={(e) => inputsChange(e)}
				/>
				<button onClick={submitFunction}>Add Goal</button>
			</form>
		</div>
	);
};

export default AddGoal;
