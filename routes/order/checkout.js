/* eslint-disable no-undef */
const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const { DB_HOST, DB_USER, DB_PASSWORD ,DB_DATABASE} = process.env;

let connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});


router.post('/',(req,res)=>{

    // if(req.headers['contnet-type']!=='application/json'||!req.body){
    //   return res.status(400).send(`request error`)
    // }
    // let order_id;
    let {order} = req.body;
    let unpaid_order_obj ={
        user : JSON.stringify(order.recipient),
        pay : false,
        order_products : JSON.stringify(req.body.list)
    };
    delete order.list;
    unpaid_order_obj.user_orders = JSON.stringify(order);
    let order_sql = 'INSERT INTO orders SET?';
    connection.query( order_sql, unpaid_order_obj, (err,res) => {
        if (err){
            console.log('[mysql error]',err);

            res.json({error:err.message});
        }
        else{
            return order_id= res.insertId;
        }

        console.log('variant add on');
    });


    let YourPartnerKey = 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG';
    let merchant_id =  'AppWorksSchool_CTBC';
    let cardholder = {
        'phone_number': '+886923456789',
        'name': 'Jane Doe',
        'email': 'Jane@Doe.com',
        'zip_code': '12345',
        'address': '123 1st Avenue, City, Country',
        'national_id': 'A123456789'
    };
    // later change
    let details = 'test';
    let amount = 1000;
    let {prime} = req.body;
    let topay_data= {
        prime : prime,
        partner_key : YourPartnerKey,
        merchant_id : merchant_id,
        details : details,
        amount : amount,
        cardholder : cardholder,
        remember : true
    };

    try{
        // 1. use method get to get user's  name profiles email and picture url
        axios({
            method : 'post',
            url : 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime',
            headers :{ 'Content-Type' : 'application/json',
                'x-api-key': YourPartnerKey },
            data : topay_data
        })
        //notice that global res might over write by local res
            .then((_res)=>{
                if(_res.data.msg === 'Success'){
                    //insert in to database
                    let {last_four} =_res.data.card_info;
                    let time = JSON.stringify(_res.data.transaction_time_millis);
                    let pay_sql = `UPDATE orders SET ? where order_id = '${order_id}'`;
                    let paid_order_obj ={
                        pay : true,
                        time :time,
                        last_four : last_four
                    };
                    connection.query( pay_sql, paid_order_obj, (err) => {
                        if (err){
                            console.log('[mysql error]',err);

                            // res.json({error:err.message});
                        }
                        else{
                            let payment_Result ={};
                            let data ={
                                number : order_id
                            };
                            payment_Result.data = data;
                            res.status(200).json(payment_Result);

                        }

                    });
                }
            }
            );
        // another way to type
        // axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', topay_data, {
        //   headers: {
        //     'x-api-key': YourPartnerKey
        //   }
        // })

    }catch(err){
        res.status(403).send('sign in failed'+err);
    }
});

module.exports = router;