const router = require('express').Router();
const logOriginalUrl = require('../middlewares/logOriginalUrl');
const User = require('../models/user');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../controllers/users');


  router.use(logOriginalUrl);


  router.get("/", getUsers);
  router.get("/:user_id", getUser);
  router.post("/", createUser);
  router.patch("/:user_id", updateUser);
  router.delete("/:user_id", deleteUser);

module.exports = router;
