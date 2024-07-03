const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags with their associated Product data
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.findAll({
            include: [{ model: Product, through: ProductTag }]
        });
        res.status(200).json(tags);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET a single tag by its ID with its associated Product data
router.get('/:id', async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag }]
        });
        if (!tag) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.json(tag);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST create a new tag
router.post('/', async (req, res) => {
    try {
        const newTag = await Tag.create({
            tag_name: req.body.tag_name
        });
        res.status(201).json(newTag);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// PUT update a tag's name by its ID
router.put('/:id', async (req, res) => {
    try {
        const tagUpdate = await Tag.update(
            { tag_name: req.body.tag_name },
            { where: { id: req.params.id } }
        );
        if (tagUpdate[0] === 0) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.json({ message: 'Tag updated!' });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// DELETE a tag by its ID
router.delete('/:id', async (req, res) => {
    try {
        const tagDelete = await Tag.destroy({
            where: { id: req.params.id }
        });
        if (!tagDelete) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.json({ message: 'Tag deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
