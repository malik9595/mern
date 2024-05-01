const express = require('express');
const router = express.Router();
const {
	getGoal,
	postGoal,
	updateGoal,
	deleteGoal,
} = require('../goalController/controller');
const authMidleware = require('../midleware/authMidleware');

router.get('/', authMidleware, getGoal);
router.post('/', authMidleware, postGoal);
router.put('/:id', authMidleware, updateGoal);
router.delete('/:id', authMidleware, deleteGoal);

module.exports = router;
