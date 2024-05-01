import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, goalData } from '../features/user';
import axios from 'axios';
import AddGoal from '../components/AddGoal';
import GoalLists from '../components/GoalLists';
import Update from '../components/Update';

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.userData);
	const isUpdating = useSelector((state) => state.user.update);
	const token = localStorage.getItem('token');
	useEffect(() => {
		!token && navigate('/login');
		dispatch(login());
	}, [user]);

	return (
		<div className='container dashboard' style={{ height: '300px' }}>
			<h3>Dashboard</h3>
			<p>This is Dashboard and Only register or sign user can access</p>
			<br />

			{!isUpdating.isUpdating && <AddGoal />}
			{isUpdating.isUpdating && <Update />}
			<GoalLists />
		
			{/* <span>	{console.log(isUpdating.isUpdating) }</span> */}
		</div>
	);
};

export default Dashboard;
