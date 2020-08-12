const express = require('express');
const router = express.Router();
const axios = require('axios');

const { query } = require('../../util/mysqlcon');

router.get('/',async (req,res)=>{
    const insert_set =[];
    try{
        axios({
            method : 'get',
            url : 'http://arthurstylish.com:1234/api/1.0/order/data',
        })
            .then( async (_res) =>{

                // let data = JSON.stringify(_res.data)
                let data = _res.data;
                res.send(data[0]);

                let insert_orders_sql = 'INSERT INTO orders (total, user_orders) VALUES ?';
                for(let i=0;i<data.length;i++){
                    insert_set.push([JSON.stringify(data[i].total) ,JSON.stringify(data[i].list)]);
                }
                await query('TRUNCATE TABLE orders');
                await query(insert_orders_sql,[insert_set], (err) => {
                    if (err){
                        console.log('[mysql error]', err);
                    }
                    else{
                        console.log('fake orders query successed');
                    }
                });

            });
    }catch(err){
        console.log(err);


    }}
);


module.exports = router;