const express = require('express');
const router = express.Router();
const co = require('co-express');

const user_controller = require('../controllers/userController');

// GET request for all existing users
router.get('/', co(function* (req, res, next) {
  const userList = yield user_controller.users_list();
  res.status(200).data = userList;
  next();
}));

// POST request to create a single user
router.post('/', co(function* (req, res, next) {
  const user = yield user_controller.users_create(req.body);
  res.status(200).data = user;
  next();
}));

// GET request for a single user
router.get('/:user_id', co(function* (req, res, next) {
  const user = yield user_controller.user_get(req.params.user_id);
  res.status(200).data = user;
  next();
}));

// PUT request to update user infor
// router.put('/:user_id', user_controller.user_update);

// DELETE request to delete an existing user
router.delete('/:user_id', co(function* (req, res, next) {
  const user = yield user_controller.user_delete(req.params.user_id);
  res.status(200).data = user;
  next();
}));

module.exports = router;
