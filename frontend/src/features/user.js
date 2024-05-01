import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
	userData: {},
	login: false,
	update: {isUpdating:false},
};
const user = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		userData: (state, action) => {
			state.login = state.login;
			state.update = state.update;
			state.userData = action.payload;
		},

		login: (state) => {
			state.userData = state.userData;
			state.update = state.update;
			state.login = localStorage.getItem('token') ? true : false;
		},
		update: (state, action) => {
			state.login = state.login;
			state.userData = state.userData;
			state.update = action.payload;
		},
	},
});

export const { userData, login, update } = user.actions;
export default user.reducer;
