import React from 'react';
import { DeleteFunction } from './Postman';
import { update } from '../features/user';
import { useDispatch } from 'react-redux';

const Lists = ({ title, desc, id }) => {
	const dispatch = useDispatch();
	return (
		<div className='goallists'>
			<span>{title}</span>
			<span>{desc}</span>
			<span onClick={() => DeleteFunction(id)}>Delete</span>
			<span onClick={() => dispatch(update({ title, desc, id, isUpdating:true }))}>Update</span>
		</div>
	);
};

export default Lists;
