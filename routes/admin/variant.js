//store variants
const express = require('express');
// const mysql = require('mysql');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const {query} = require('../../util/mysqlcon');

router.post('/', async (req)=>{
    let {id} = req.body;
    let {color_name} = req.body;
    let {color_code} = req.body;
    let {size} = req.body;
    let {stock} = req.body;
    // unsafe version
    // let variants_sql=  `INSERT INTO variant
    //         ( id , color_name , color_code ,  size , stock)
    //          VALUES
    //          ('${id}','${color_name}', '${color_code}', '${size}', '${stock}');` ;
    let variants_value = {id , color_name , color_code ,  size , stock};
    let variants_sql = 'INSERT INTO variant SET?';
    await query( variants_sql, variants_value);

});
module.exports = router;