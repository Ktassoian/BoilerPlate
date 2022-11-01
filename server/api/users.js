const router = require('express').Router();
const verifyToken = require('../auth/verifyToken');
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', verifyToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
      });
      res.json(users);
    } else {
      res.status(401).send('User does not have admin access');
    }
  } catch (err) {
    next(err);
  }
});
