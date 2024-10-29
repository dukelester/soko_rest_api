const express = require('express');

const router = express.Router()


const { getUsers, createUser, userLogin,
    getUserDetails, updateUser, deleteUser } = require('../controllers/users');


router.get('/', getUsers);


router.post('/signup', createUser);


router.post('/login', userLogin);

router.get('/:userId', getUserDetails);

router.patch('/:userId', updateUser);


router.delete('/:userId', deleteUser);



module.exports = router;