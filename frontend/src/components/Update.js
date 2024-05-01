import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { update } from '../features/user';

const Update = () => {
	const dispatch = useDispatch();
    
	const INITIAL_VALUE =  useSelector(state=>state.user.update)
	const [data, setData] = useState(INITIAL_VALUE);
	const { title, desc , id} = data;

	const inputsChange = (e) => {
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const submitFunction = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		console.log(token);
        const config = 	{headers: { Authorization: `Bearer ${token}` }}
		axios
		.put(`/api/${id}`,data,config)
		.then((ans) => console.log(ans.data))
		.catch((err) => console.log(err.message));
		dispatch(update({ isUpdating:false }))
		// window.location.reload()

	};
	return (
		<div>
			UpdateGoal
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
                <button onClick={submitFunction}> Update</button>
				
			</form>
		</div>
	);
};

export default Update;
