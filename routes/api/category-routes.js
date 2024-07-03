const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with their associated Products
router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET one category by its ID value with its associated Products
router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id!' });
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST create a new category
router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create({
            category_name: req.body.category_name,
        });
        res.status(201).json(newCategory);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// PUT update a category by its ID value
router.put('/:id', async (req, res) => {
    try {
        const categoryUpdate = await Category.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!categoryUpdate[0]) {
            res.status(404).json({ message: 'No category with this id!' });
            return;
        }
        res.status(200).json({ message: 'Category updated!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE a category by its ID value
router.delete('/:id', async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id!' });
            return;
        }
        res.status(200).json({ message: 'Category deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
