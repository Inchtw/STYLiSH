const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// const { pool_query } = require('../../../util/mysqlcon');
const mysql_module = require('../../../util/mysqlcon');


const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

client.on('error', function (error) {
    console.error(error);
});

function cache(req, res, next) {
    if(client.ready){
        client.get('data', (err, data) => {
            if (err) {throw err;}
            if (data !== null) {
                res.json(JSON.parse(data));
            } else {
                next();
            }
        });
    }else{
        next();
    }
}

const getGroupResult = async function(req,res) {
    let connection = await mysql_module.connection();
    let select_group_sql = 'SELECT  user_id ,SUM(orders.total)AS total_payment FROM orders GROUP BY user_id ORDER BY user_id;';
    await connection.query(select_group_sql, async function (err, result) {
        try {
            let output = {};
            output.data = result;
            res.send(output);
        } catch{
            console.log(err);
        }
        finally {
            await connection.release();
        }
    }
    );
};

const getGroupResultCache = async function(req,res) {
    let connection = await mysql_module.connection();
    let select_group_sql = 'SELECT  user_id ,SUM(orders.total)AS total_payment FROM orders GROUP BY user_id ORDER BY user_id;';
    await connection.query(select_group_sql, async function (err, result) {
        try {
            let output = {};
            output.data = result;
            if (client.ready) {
                client.setex('data', 60, JSON.stringify(output));
            }
            res.send(output);

        } catch{
            console.log(err);
        }
        finally {

            await connection.release();
        }
    }
    );
};

const getNormalResult = async function(req,res) {
    let connection = await mysql_module.connection();
    let select_order = 'select user_id , total from orders';
    let output = {};
    let map = {};
    await connection.query(select_order, async function (err, result) {
        try {
            result.forEach((el) => {
                let id = el['user_id'];
                let value = map[id]||0;
                map[id] = value + el['total'];
            });
            let data = Object.keys(map).map(function (key) {
                return { user_id: Number(key), total_payment: map[key] };
            });
            output.data = data;
            res.send(output);
        } catch{
            console.log(err);
        }
        finally {
            await connection.release();
        }
    }
    );
};

const getNormalResultCache = async function(req,res) {
    let connection = await mysql_module.connection();
    let select_order = 'select user_id , total from orders';
    let output = {};
    let map = {};
    await connection.query(select_order, async function (err, result) {
        try {
            result.forEach((el) => {
                let id = el['user_id'];
                let value = map[id]||0;
                map[id] = value + el['total'];
            });
            let data = Object.keys(map).map(function (key) {
                return { user_id: Number(key), total_payment: map[key] };
            });
            output.data = data;
            if (client.ready) {
                client.setex('data', 60, JSON.stringify(output));
            }
            res.send(output);
        } catch{
            console.log(err);
        }
        finally {
            await connection.release();
        }
    }
    );
};

router.get('/groupbyCache' , cache ,getGroupResultCache);
router.get('/groupby' , getGroupResult);
router.get('/Cache', cache , getNormalResultCache);
router.get('/',getNormalResult );

module.exports = router;