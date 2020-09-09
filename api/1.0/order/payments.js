const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// const { pool_query } = require('../../../util/mysqlcon');
const redis = require('redis');
const mysql_module = require('../../../util/mysqlcon');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

client.on('error', (error) => {
  console.error(error);
});

function cache(req, res, next) {
  if (client.ready) {
    client.get('data', (err, data) => {
      if (err) { throw err; }
      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

const getGroupResult = async function (req, res) {
  const connection = await mysql_module.connection();
  const select_group_sql = 'SELECT  user_id ,SUM(orders.total)AS total_payment FROM orders GROUP BY user_id ORDER BY user_id;';
  await connection.query(select_group_sql, async (err, result) => {
    try {
      const output = {};
      output.data = result;
      res.send(output);
    } catch {
      console.log(err);
    } finally {
      await connection.release();
    }
  });
};

const getGroupResultCache = async function (req, res) {
  const connection = await mysql_module.connection();
  const select_group_sql = 'SELECT  user_id ,SUM(orders.total)AS total_payment FROM orders GROUP BY user_id ORDER BY user_id;';
  await connection.query(select_group_sql, async (err, result) => {
    try {
      const output = {};
      output.data = result;
      if (client.ready) {
        client.setex('data', 60, JSON.stringify(output));
      }
      res.send(output);
    } catch {
      console.log(err);
    } finally {
      await connection.release();
    }
  });
};

const getNormalResult = async function (req, res) {
  const connection = await mysql_module.connection();
  const select_order = 'select user_id , total from orders';
  const output = {};
  const map = {};
  await connection.query(select_order, async (err, result) => {
    try {
      result.forEach((el) => {
        const id = el.user_id;
        const value = map[id] || 0;
        map[id] = value + el.total;
      });
      const data = Object.keys(map).map((key) => ({ user_id: Number(key), total_payment: map[key] }));
      output.data = data;
      res.send(output);
    } catch {
      console.log(err);
    } finally {
      await connection.release();
    }
  });
};

const getNormalResultCache = async function (req, res) {
  const connection = await mysql_module.connection();
  const select_order = 'select user_id , total from orders';
  const output = {};
  const map = {};
  await connection.query(select_order, async (err, result) => {
    try {
      result.forEach((el) => {
        const id = el.user_id;
        const value = map[id] || 0;
        map[id] = value + el.total;
      });
      const data = Object.keys(map).map((key) => ({ user_id: Number(key), total_payment: map[key] }));
      output.data = data;
      if (client.ready) {
        client.setex('data', 60, JSON.stringify(output));
      }
      res.send(output);
    } catch {
      console.log(err);
    } finally {
      await connection.release();
    }
  });
};

router.get('/groupbyCache', cache, getGroupResultCache);
router.get('/groupby', getGroupResult);
router.get('/Cache', cache, getNormalResultCache);
router.get('/', getNormalResult);

module.exports = router;
