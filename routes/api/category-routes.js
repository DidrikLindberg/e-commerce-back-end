const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// endpoint to get all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// endpoint to get one category
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

// endpoint to create a new category
router.post('/', (req, res) => {
  // create a new category
});

// endpoint to update a category
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

// endpoint to delete a category
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
