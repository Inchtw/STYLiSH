const mysql = require('mysql');
require('dotenv').config();
const { AWS_DB_HOST, AWS_DB_USER, AWS_DB_PASSWORD, AWS_DB_DATABASE } = process.env;

let connection = mysql.createConnection({
    host: AWS_DB_HOST,
    user: AWS_DB_USER,
    password: AWS_DB_PASSWORD,
    database: AWS_DB_DATABASE
});

const { query} = require('../util/mysqlcon');



const insert_set =[];
// fakeOrderGenerator(random_generator(1000, 1000));
fakeOrderGenerator(23000);


function random_generator(min, max) {
    return Math.floor(Math.random() * max) + min;
}


async function fakeOrderGenerator(max_range) {
    for (let i = 0; i < max_range; i++) {
        let user_id = random_generator(1, 5);
        let total = random_generator(100, 1000);
        // orders_insert(user_id, total)
        insert_set.push([user_id,total]);
    }
    await query('TRUNCATE TABLE orders');
    let fake_orders_query = 'INSERT INTO orders (user_id, total) VALUES ?';
    await query( fake_orders_query ,[insert_set], (err) => {
        if (err){
            console.log('[mysql error]', err);
            connection.rollback();
        }
        else{
            console.log('fake orders query successed');
        }
    });

}

