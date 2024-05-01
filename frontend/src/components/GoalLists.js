import axios from 'axios';
import React, { useEffect } from 'react';
import { userData } from '../features/user';
import { useDispatch, useSelector } from 'react-redux';
import Lists from './Lists';
const GoalLists = () => {
	const token = localStorage.getItem('token');
	const responseData = useSelector((state) => state.user.userData);
	const goalsData = responseData?.goalData;
	const dispatch = useDispatch();
	
	useEffect(() => {
		axios
			.get('/api', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((ans) => dispatch(userData(ans.data)))
			.catch((err) => console.log(err.message));
	}, [responseData]);
	return (
		<div>
			<br />
			<h3>GoalLists</h3>
			<div>
				{goalsData &&
					goalsData.map((goal) => {
						return (
							<Lists
								title={goal.title}
								desc={goal.desc}
								id={goal._id}
								key={goal._id}
							/>
						);
					})}
				{!goalsData && <p>No goals found</p>}
			</div>
		</div>
	);
};

export default GoalLists;
