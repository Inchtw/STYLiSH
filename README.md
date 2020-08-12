# Inch's stylish demo

*midterm : https://inchtw.website/admin/dashboard.html

* website URL :  http://13.251.148.0/

* domain name :  https://inchtw.website/ 

website domain name : inchtw.website
apply https by Cloudflare 


##### week_4  
    1. install multer-s3 & aws-sdk
    2. change file name
    3. upload all pictures to aws-s3
    4. set uri for campaign and products
    5. add fake data generator 
    6. create payment api
    7. change ec2 database route to rds
    8. rewrite some sql throguh pool


##### week_3_part_3 (after adjuct)
    1. adjust cart color picking error with final cart check in order btn

##### week_3_part_2 (Web function finished)

    1. add cart remove function (remove, update cart, update local storage , update price)
    2. show focus for each tag
    3. show next pagin while scrolling down 
    4. adjust form for products /campaigns addition
    5. let carousell button works to witch when clicking on  

##### week_3_part_1
    1. npm istall redis to node.js 
    2. set routes/admin/campaign.js 
       api/1.0/marketing with redis
    3. set api/1.0/products.js 
       public/js/product.js with redis
    4. use redis-server --daemonize yes to run 
    5. aws ec2 install gcc / wget redis 



#### week_2_part_5

    1. add cart.html for checkout
    2. add profile.html for sign in  sign up 
    3. add profile presentationl with token  
    4. apply fb sign in & up in profile.html
    5. use local storage to store user info & cart order 



#### week_2_part_4

* work flow:
    1. get id from param use URLSearchParams(window.location.search)
    2. fetch api and insert into html 
    3. add functional button and click events   

#### week_2_part_3

* URL :  http://13.251.148.0/

* work flow:
    1. change order checkout path 
    2. create index.html / index.css / index.js
    3. insert databases
       detail:
       campaigns:
       products: 
    4. fetch api & create elements in Html
    5. adjust funtional



#### week_2_part_2

* work flow:
    1. set table to insert cart objects  ( for unpaid order record
    2. after insertion -> fetch to topay  ( send prime and other necessary data
    3. payment confirm  or fail ->  Receive payment result 
    4. create payment record 
    5. update upaid order to paid
    6. check record security 



#### week_2_part_1

* checkout_URL :  http://13.251.148.0/admin/checkout.html

* work flow:

    1. create checkout.html
    2. add front-end page
    3. apply tappay sdk
    4. use fetch to post
* ---- adjust path-----
    5. app.use (exprot rotues
    6. mysql prevent sql injection
    7. rewrite funtion //fetch // asnyc await


#### week_1_part_5

    need to  npm install axios  

* signin API : http://13.251.148.0/user/signin


#### week_1_part_4

    need to  npm install jsonwebtoken  and change .env secrect key first 

* signup API : http://13.251.148.0/user/signup
* signin API : http://13.251.148.0/user/signin
* profile API : http://13.251.148.0/user/profile

#### week_1_part_3

URL :

* campaigns API : http://13.251.148.0/api/1.0/marketing/campaigns
* admin campaigns :  http://13.251.148.0/admin/campaign.html


#### week_1_part_2

URL : 

* details API : http://13.251.148.0/api/1.0/products/details?id=12382
* search API:  http://13.251.148.0/api/1.0/products/search


#### week_1_part_1 

URL : 

* women API: http://13.251.148.0/api/1.0/products/women?paging=0




#### week_0_part_2 work flow

step 1. 

1. enter stylish folder 
2. create app.js
3. npm init -  y 
                ---> generate package.json
4. change package.json main from index.js to app.js
5. npm install express --save

step 2. start edit

6. require express  => app 
7. listen --> port 3000  ---> use  nginx to redirect port
8. write some basic web route 

step 3. ignore 

9. create gitignore  ignore module 
10. commit and push to repo with branch week_0_part2

step 4. Run Web Server in the Background

11. connet to instance linux 
12. install node & mysql & git 
13. clone git from my github branch  week_0_part2
14. install express @  folder
<!-- 15. nohup node app.js > /dev/null 2>&1 & to run the server  -->
15. use PM2 run Web Server in the Background


step 5. Install and Run MySQL Server

16. create global stylish database 
17. set properties 
18. export SQL database by mysqldump





