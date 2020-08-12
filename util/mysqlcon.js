
require('dotenv').config();
const mysql = require('mysql');
const { promisify } = require('util');
const { AWS_DB_HOST, AWS_DB_USER, AWS_DB_PASSWORD, AWS_DB_DATABASE } = process.env;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: AWS_DB_HOST,
    user: AWS_DB_USER,
    password: AWS_DB_PASSWORD,
    database: AWS_DB_DATABASE
});



const connection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {reject(err);}
            console.log('MySQL pool connected: threadId ' + connection.threadId);
            const query = (sql, binding) => {
                return new Promise((resolve, reject) => {
                    connection.query(sql, binding, (err, result) => {
                        if (err) {reject(err);}
                        resolve(result);
                    });
                });
            };
            const release = () => {
                return new Promise((resolve, reject) => {
                    if (err) {reject(err);}
                    console.log('MySQL pool released: threadId ' + connection.threadId);
                    resolve(connection.release());
                });
            };
            resolve({ query, release });
        });
    });
};

const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, binding, (err, result) => {
            if (err) { reject(err); return; }

            resolve(result);
        });
    });
};


module.exports = { pool, connection, query , pool_query: promisify(pool.query).bind(pool)};
