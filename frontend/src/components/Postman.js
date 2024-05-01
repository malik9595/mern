import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userData } from '../features/user';

export const DeleteFunction = (id) => {
    // const dispatch = useDispatch();
	// dispatch(userData());

	const token = localStorage.getItem('token');
	const config = { headers: { Authorization: `Bearer ${token}` } };
	axios
		.delete(`/api/${id}`, config)
		.then((ans) => console.log(ans.data))
		.catch((err) => console.log(err.message));
};
