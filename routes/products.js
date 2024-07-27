const { request } = require('express');
const express = require('express');
const Product = require('../database/models/product');
const { Op } = require('sequelize');

const router = express.Router();



router.get('/all', async (req, res) => {
    try {

        const all = await Product.findAll();

        res.json(all);
    }
    catch (e) {
        res.json({ message: "Error to get all " })
    }
}

)

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.json({ status: 'ERR', message: 'wrong id' });
        return
    }
    const product = await Product.sequelize.query(
        `SELECT products.id as productId,
 products.title  as productTitle,
  products.price  as productPrice,
   products.discont_price  as productDiscont,
   products.image as productImage,
    products.description  as productDescription,
    categories.id as categoryId,
    categories.title  as categoryTitle
from products  INNER JOIN categories  ON categories.id=products.categoryId  where products.id=${id}`);

    if (product.length === 0) {
        res.json({ status: 'ERR', message: 'product not found' });
        return
    }
    res.json({product:product});
})


router.get('/add/:title/:price/:discont_price/:description', (req, res) => {
    const { title, price, discont_price, description } = req.params;
    Product.create({ title, price, discont_price, description, categoryId: 1 });
    res.json(`добавлено`);
})

module.exports = router;