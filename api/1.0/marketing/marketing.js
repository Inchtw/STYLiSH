const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mysql_module = require('../../../util/mysqlcon');


const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);


client.on('error', function(error) {
    console.error(error);
});

async function getCampaigns(req,res){
    try {
        let connection = await mysql_module.connection();
        console.log('query proccessing');
        let {marketing} =req.params;
        if(marketing === 'campaigns'){
            let selectCampaigns = 'select * from campaign';
            let campaigns = await connection.query(selectCampaigns);
            let campaigns_output = {};
            campaigns_output.data = campaigns;
            if(client.ready){
                client.setex('campaigns', 3600, JSON.stringify(campaigns_output));
            }

            res.json(campaigns_output);
        }else{
            window.location.replace('/');
        }
    }catch(err){
        console.error(err);
        res.status(500);
    }

}

// Cache middleware
function cache(req, res, next) {
    if(client.ready){
        client.get('campaigns', (err, data) => {
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

router.get('/:marketing', cache , getCampaigns);




module.exports = router;