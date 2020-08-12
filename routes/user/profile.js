const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const { SecrectKEY} = process.env;


router.get('/profile', (req,res)=>{


    if(!req.header('Authorization')){
        res.status(400).send('Client Error Response: 400');
    }else{
        let authtoken = req.header('Authorization').substr(7);
        try{
            let decoded = jwt.verify(authtoken, SecrectKEY);
            let {id}  = decoded;
            let time = Date.now()/1000;
            let {exp} = decoded;
            let {provider} = decoded;
            let {name} = decoded;
            let {email} = decoded;
            let {picture} = decoded;

            let profileOutput = {};
            profileOutput.data ={
                id ,
                provider,
                name ,
                email ,
                picture

            };
            if((parseInt(time) - +exp)>0){
                localStorage.removeItem('user_token');
                window.location.reload('/profile.html');
            }else{
                res.status(200).json(profileOutput);
            }

        }catch(err){
            res.status(403).send('Inavlid Access Token');
        }


    }
} );

module.exports = router;