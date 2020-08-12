const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();
const {SecrectKEY } = process.env;

const {query} = require('../../util/mysqlcon');


// week_1_part_4
const crypto = require('crypto');

router.post('/signup', async(req,res)=>{

    let hash = crypto.createHash('sha256');
    let {provider} = req.body ;
    let picture = '';
    let access_expired = 3600;
    let signupData = req.body;
    let {name} =req.body;
    let {email} =req.body;
    let password = hash.update(req.body.password+SecrectKEY).digest('hex');
    console.log('this is signupData' + signupData);
    let signUp_sql = 'INSERT INTO user SET?' ;
    let signUp_value = {provider , name ,  email , picture , password};

    if (!name || !email || !req.body.password) {
        res.status(400).send('使用者輸入錯誤');
    } else {
        try {
            let result = await query(signUp_sql, signUp_value);
            let id = result.insertId;
            let user = {
                id: id,
                provider: provider,
                name: name,
                email: email,
                picture: picture
            };
            let access_token = jwt.sign({ id: id, provider: provider, name: name, email: email, picture: picture }, SecrectKEY, { expiresIn: access_expired });
            let signupResult = {};
            signupResult.data = {
                access_token: access_token,
                access_expired: access_expired,
                user
            };
            res.status(200).json(signupResult);

        } catch(err){

            if (err.sqlState == 23000) {
                console.log(err);
                res.status(403).json({error : 'email重複輸入'});
            } else {
                console.log(err);
                res.status(500).json({ error: 'server error' });
            }

        }
    }
});


//signin
router.post('/signin', async (req, res) => {
    let access_expired = 3600;
    let hash = crypto.createHash('sha256');
    let { provider } = req.body;
    let { email } = req.body;
    let password = hash.update(req.body.password + SecrectKEY).digest('hex');

    if (provider === 'native' && email && password) {
        // no need for password to be safe , cause it had been change
        let signIn_sql = `select * from user where email = ? AND password = '${password}';`;
        try {
            let result = await query(signIn_sql, email);

            if (result.length === 0) {
                res.status(403).json({ error: '帳號或密碼輸入錯誤' });
                //  console.log(err)
            } else {
                let { id } = result[0];
                let { provider } = result[0];
                let { name } = result[0];

                let { picture } = result[0];
                let user = {
                    id,
                    provider,
                    name,
                    email,
                    picture
                };
                let signinOutput = {};
                let access_token = jwt.sign({ id, provider, name, email, picture }, SecrectKEY, { expiresIn: access_expired });
                signinOutput.data = {
                    access_token: access_token,
                    access_expired: access_expired,
                    user
                };
                console.log(signinOutput);
                res.status(200).json(signinOutput);

            }

        } catch (err) {
            res.status(500).json({ error: '伺服器錯誤' });
            console.log(err);
        }

    } else if (provider === 'facebook' && req.body.access_token) {
        let facebooktoken = req.body.access_token;
        try {
            // 1. use method get to get user's  name profiles email and picture url
            axios({
                method: 'get',
                baseURL: 'https://graph.facebook.com/',
                url: '/me?fields=id,name,email&access_token=' + facebooktoken,
                'Content-Type': 'application/json',
            })
                .then(async (FB_result) => {

                    let { data } = FB_result;
                    let name = data.name;
                    let email = data.email;
                    // console.log(result.data)
                    let FB_signIn_sql = `select * from user where email = '${email}' AND name ='${name}';`;
                    // console.log(FB_signIn_sql)
                    try {
                        let FBloginResult = await query(FB_signIn_sql);
                        if (FBloginResult.length === 0) {
                            // no user
                            // sign up
                            let picture = '';
                            let password = '';
                            let provider = 'facebook';
                            let FB_signUp_sql = 'INSERT INTO user SET?';
                            let FB_signUp_value = { provider, name, email, picture, password };
                            try {
                                let result = await query(FB_signUp_sql, FB_signUp_value);
                                let id = result.insertId;
                                let user = {
                                    id: id,
                                    provider: provider,
                                    name: name,
                                    email: email,
                                    picture: picture
                                };
                                let access_token = jwt.sign({ id: id, provider: provider, name: name, email: email, picture: picture }, SecrectKEY, { expiresIn: access_expired });
                                let signupResult = {};
                                signupResult.data = {
                                    access_token: access_token,
                                    access_expired: access_expired,
                                    user
                                };
                                res.status(200).json(signupResult);

                            } catch (err) {

                                if (err.sqlState == 23000) {
                                    res.status(403).json({ error: 'email重複輸入' });
                                } else {
                                    res.status(500).json({ error: 'server error' });
                                }

                            }



                        } else {
                            let { id } = FBloginResult[0];
                            let { provider } = FBloginResult[0];
                            let { name } = FBloginResult[0];
                            let { email } = FBloginResult[0];
                            let { picture } = FBloginResult[0];

                            let user = {
                                id,
                                provider,
                                name,
                                email,
                                picture
                            };
                            let FB_signinOutput = {};
                            let access_token = jwt.sign({ id, provider, name, email, picture }, SecrectKEY, { expiresIn: access_expired });
                            FB_signinOutput.data = {
                                access_token: access_token,
                                access_expired: access_expired,
                                user
                            };
                            res.status(200).json(FB_signinOutput);

                        }
                    } catch (err) {
                        res.status(500).json({ error: 'server error' });

                    }
                }
                );
        } catch (err) {
            res.status(500).json({ error: 'server error' });

        }
    } else {
        res.status(403).json({ error: '登錄錯誤 請再重試' });
    }
}
);



module.exports = router;