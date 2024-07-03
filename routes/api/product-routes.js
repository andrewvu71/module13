const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products including associated Category and Tag data
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Category },
                { model: Tag, through: ProductTag }
            ]
        });
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get a single product by its ID including associated Category and Tag data
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: Category },
                { model: Tag, through: ProductTag }
            ]
        });
        if (!product) {
            res.status(404).json({ message: 'No product found with this id!' });
            return;
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create new product and its associations with tags
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        if (req.body.tagIds && req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map(tag_id => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });
            await ProductTag.bulkCreate(productTagIdArr);
        }
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// Update product data including its tags
router.put('/:id', async (req, res) => {
    try {
        await Product.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        const productTags = await ProductTag.findAll({
            where: { product_id: req.params.id }
        });
        const productTagIds = productTags.map(tag => tag.tag_id);

        // Determine new tags to add and old tags to remove
        const newProductTags = req.body.tagIds
            .filter(tag_id => !productTagIds.includes(tag_id))
            .map(tag_id => ({ product_id: req.params.id, tag_id }));
        const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(tag => tag.id);

        await Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);

        res.json({ message: 'Product updated!' });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// Delete one product by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (result === 0) {
            res.status(404).json({ message: 'No product found with this id!' });
            return;
        }
        res.json({ message: 'Product deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
