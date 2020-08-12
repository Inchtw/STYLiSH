const express = require('express');
const router = express.Router();
// const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const {  AWS_BUCKET, AWS_KEYID, AWS_KEY, AWS_WEBFRONT } = process.env;
const { query } = require('../../util/mysqlcon');


const s3 = new aws.S3({
    accessKeyId: AWS_KEYID,
    secretAccessKey: AWS_KEY,
    Bucket: AWS_BUCKET
});


let z = -1;

function imageCounter(j) {
    z = j+1;
    if (z === 0) {
        return '';
    } else {
        return (`-${z}`);
    }
}

var product_upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileExtension = file.mimetype.split('/')[1];
            cb(null,'products/'+req.body.id+ '/' + file.fieldname + imageCounter(z) + '.' + fileExtension);
        },
    })
});


const imgUpload = product_upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'other_images', maxCount: 5 }]);

router.post('/', imgUpload ,async (req,res)=>{
    //--- inside the product
    let {id} = req.body;
    let {title} = req.body;
    let {category} = req.body;
    let {description} = req.body;
    let {price} = req.body;
    let {texture} = req.body;
    let {wash} = req.body;
    let {place} = req.body;
    let {note} = req.body;
    let {story} = req.body;

    let main_image_url = AWS_WEBFRONT+req.files.main_image[0].key;

    let other_images_urls=[];
    for(let o=0;o< req.files['other_images'].length;o++){
        let other_images_url ='';

        other_images_url = AWS_WEBFRONT+ req.files.other_images[o].key;

        other_images_urls.push(other_images_url);
    }
    let product_sql = 'INSERT INTO product SET ?';
    let product_value = { id,  title , category ,  description , price , texture , wash , place , note , story , main_image:main_image_url};

    await query( product_sql, product_value, (err, result) => {
        if (err){
            console.log('[mysql error]',err);

            res.send('error'+ result);
        }
        else{
            console.log('product query successed');
        }
    });
    // insert into others imgage tables table name : otherimages // column name : image_url
    let image_value_set ='';
    for(let i=0;i< other_images_urls.length;i++){
        image_value_set += `('${id}','${other_images_urls[i]}'),`;
    }
    image_value_set = image_value_set.slice(0, -1);

    let otherimage_sql = ` 
            INSERT INTO otherimages
            ( id,  images_url)
            VALUES
            ${image_value_set};
        `;
    await query( otherimage_sql, (err, result) => {
        if (err){
            console.log('[mysql error]',err);

            res.send('error'+ result);
        }
        else{
            console.log('otherimage import successed');
            z = -1;
        }
    });
    console.log('add on');
});

module.exports = router;