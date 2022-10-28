const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// route for all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: req.query,
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});
