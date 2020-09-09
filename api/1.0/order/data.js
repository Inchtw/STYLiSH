const express = require('express');

const router = express.Router();

const { query } = require('../../../util/mysqlcon');

router.get('/', async (req, res) => {
  try {
    const order_data_sql = 'select total as total ,user_orders as list from orders ';
    const results = await query(order_data_sql);
    const output = {};
    let sumup_total = 0;
    const colors = {};
    const map = {};
    const idmap = {};
    const sizemap = {};
    const prices = [];
    results.forEach((element) => {
      element.list = JSON.parse(element.list);
      element.list.forEach((el) => {
        const colorName = el.color.name;
        const colorCode = el.color.code;
        const count = map[colorName] || 0;
        const { qty } = el;

        const { id } = el;
        const idcount = idmap[id] || 0;
        idmap[id] = idcount + qty;

        const { size } = el;
        const sizes = sizemap[id] || {};
        sizemap[id] = sizes;
        const countsize = sizemap[id][size] || 0;
        sizemap[id][size] = countsize + qty;

        const { price } = el;
        colors[colorName] = colorCode;
        map[colorName] = count + qty;
        for (let i = 0; i < qty; i++) {
          prices.push(price);
        }
      });

      sumup_total += element.total;
    });

    const ids = sortObjectEntries(idmap, 5);
    const for5countS = [];
    const for5countM = [];
    const for5countL = [];

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      const size_count = sizemap[id].S;
      for5countS.push(size_count);
    }
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      const size_count = sizemap[id].M;
      for5countM.push(size_count);
    }
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const size_count = sizemap[id].L;
      for5countL.push(size_count);
    }
    const sin = { ids, count: for5countS, size: 'S' };
    const Min = { ids, count: for5countM, size: 'M' };
    const Lin = { ids, count: for5countL, size: 'L' };
    const color_out = Object.keys(map).map((key) => ({ colorName: key, colorCode: colors[key], count: map[key] }));

    const byTop5size = [];
    byTop5size.push(sin);
    byTop5size.push(Min);
    byTop5size.push(Lin);

    output.totalRevenue = sumup_total;
    output.ByColor = color_out;
    output.Byprice = prices;
    output.byTop5size = byTop5size;

    res.json(output);
  } catch (err) {
    console.log(err);
  }
});

function sortObjectEntries(obj, n) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]).map((el) => el[0]).slice(0, n);
}

module.exports = router;
