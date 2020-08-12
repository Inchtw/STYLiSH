const express = require('express');
const router = express.Router();

const { query } = require('../../../util/mysqlcon');

router.get('/',async (req,res)=>{
    try{

        let order_data_sql = 'select total as total ,user_orders as list from orders ';
        let results = await query(order_data_sql);
        let output ={};
        let sumup_total =0;
        let colors={};
        let map= {};
        let idmap ={};
        let sizemap ={};
        let prices = [];
        results.forEach( element => {
            element['list'] = JSON.parse(element['list']);
            element.list.forEach((el)=>{
                let colorName = el.color.name;
                let colorCode = el.color.code;
                let count = map[colorName]||0;
                let qty = el.qty;

                let id = el.id;
                let idcount = idmap[id]||0;
                idmap[id] = idcount+ qty;

                let size = el.size;
                let sizes = sizemap[id]||{};
                sizemap[id]=sizes;
                let countsize = sizemap[id][size]||0;
                sizemap[id][size] = countsize+ qty;

                let price = el.price;
                colors[colorName] = colorCode;
                map[colorName] = count+ qty;
                for(let i =0 ; i<qty; i++){
                    prices.push(price);
                }
            }
            );

            sumup_total += element.total;
        });

        let ids = sortObjectEntries(idmap,5);
        let for5countS=[];
        let for5countM=[];
        let for5countL=[];

        for(let i=0; i<ids.length;i++){
            let id = ids[i];

            let size_count= sizemap[id]['S'];
            for5countS.push(size_count);

        }
        for(let i=0; i<ids.length;i++){
            let id = ids[i];

            let size_count= sizemap[id]['M'];
            for5countM.push(size_count);

        }
        for(let i=0; i<ids.length;i++){
            let id = ids[i];
            let size_count= sizemap[id]['L'];
            for5countL.push(size_count);

        }
        let sin = {ids ,count:for5countS,size:'S'};
        let Min = {ids ,count:for5countM,size:'M'};
        let Lin = {ids ,count:for5countL,size:'L'};
        let color_out = Object.keys(map).map(function (key) {
            return { colorName: key,colorCode: colors[key] , count: map[key] };
        });

        let byTop5size=[];
        byTop5size.push(sin);
        byTop5size.push(Min);
        byTop5size.push(Lin);

        output.totalRevenue = sumup_total;
        output.ByColor =color_out;
        output.Byprice =prices;
        output.byTop5size =byTop5size;


        res.json(output);
    }catch(err){
        console.log(err);
    }
}
);


function sortObjectEntries(obj, n){
    return  Object.entries(obj).sort((a,b)=>b[1]-a[1]).map(el=>el[0]).slice(0,n);
}


module.exports = router;