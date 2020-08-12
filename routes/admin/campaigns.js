const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const { AWS_BUCKET, AWS_KEYID, AWS_KEY, AWS_WEBFRONT } = process.env;
// const mysql_module = require('../../../util/mysqlcon');
const { pool_query } = require('../../util/mysqlcon');

const s3 = new aws.S3({
    accessKeyId: AWS_KEYID,
    secretAccessKey: AWS_KEY,
    Bucket: AWS_BUCKET
});


var campaign_upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const fileExtension = file.mimetype.split('/')[1];
            cb(null,'campaigns/'+req.body.product_id+'/'+'campaign_'+ req.body.product_id  + '.' + fileExtension);
        },
    })
});




const redis = require('redis');
const client = redis.createClient();

client.on('error', function(error) {
    console.error(error);
});
router.post('/', campaign_upload.fields([{ name: 'picture' }])  ,async (req,res)=>{
    let {product_id} = req.body;
    let {story} = req.body;
    let picture_url = AWS_WEBFRONT + req.files.picture[0].key;
    // let connection =  await mysql_module.connection()
    let campaign_sql = 'INSERT INTO campaign SET?';
    let campaign_value = { product_id, picture: picture_url, story };

    await pool_query( campaign_sql,campaign_value, (err, result) => {
        if (err){
            console.log('[mysql error]',err);
            res.send('error'+ result);
        }
        else{
            console.log('campaign query successed');
            client.del('campaigns');
        }
    });
});




module.exports = router;