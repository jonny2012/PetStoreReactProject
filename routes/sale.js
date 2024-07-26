const express = require('express');
const Product = require("./../database/models/product");
const { Op } = require('sequelize');

const router = express.Router();


router.get('/send', (req, res) =>{
    res.json({});

})
router.get('/all', async (req, res) =>{
    try{

    
    const all = await Product.findAll({where: {discont_price:{[Op.ne]:null}}});
        
    if(all.length === 0){
        res.json({status: 'ERR', message: 'product not found'});
        return
    }
    res.json(all);
}
catch(e){
    res.json({message: "error  in request"})
}
}
)

router.post('/send', (req, res) => {
    
    res.json({status: 'OK', message: 'request processed'})
})


module.exports = router;