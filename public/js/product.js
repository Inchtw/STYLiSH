const urlParam = new URLSearchParams(window.location.search);

const urlID = urlParam.get('id');

const product_url = `/api/1.0/products/details?id=${urlID}`;

const categories = ['women', 'men', 'accessories'];
const product_image = document.getElementById('product-main-image');
const product_name = document.getElementById('product-name');
const product_id = document.getElementById('product-id');
const product_price = document.getElementById('product-price');
const product_colors = document.getElementById('product-colors');
const product_sizes = document.getElementById('product-sizes');
// const product_qty = document.getElementById("qty")
const product_story = document.getElementById('product-story');
const product_images = document.getElementById('product-images');
const product_summary = document.getElementById('product-summary');
const product_details = document.querySelector('.details');
const cart_qty_mobile = document.getElementById('cart-qty-mobile');
const cart_qty = document.getElementById('cart-qty');

if (localStorage.getItem('cart_order')) {
  try {
    const cartList = JSON.parse(localStorage.getItem('cart_order'));
    cart_qty.innerHTML = cartList.list.length;
    cart_qty_mobile.innerHTML = cartList.list.length;
  } catch (error) {
    console.log(error);
    localStorage.removeItem('cart_order');
    cart_qty.innerHTML = 0;
    cart_qty_mobile.innerHTML = 0;
  }
} else {
  cart_qty.innerHTML = 0;
  cart_qty_mobile.innerHTML = 0;
}

// const cartL =[]
fetch(product_url, {
  method: 'GET',
}).then((res) => res.json()
  .then((result) => {
    const add_img = document.createElement('img');
    const { data } = result;
    const { id } = data;
    const { category } = data;
    show_cata(category);
    const { colors } = data;
    for (const color of colors) {
      const { code } = color;
      const add_color = document.createElement('div');
      add_color.classList.add('color');
      add_color.style = `background-color: #${code}`;
      if (color === colors[0]) {
        add_color.classList.add('current');
      }
      product_colors.appendChild(add_color);
    }
    const { description } = data;
    const { images } = data;
    for (const img of images) {
      const add_imgs = document.createElement('img');
      add_imgs.setAttribute('src', img);
      product_images.appendChild(add_imgs);
    }
    const { main_image } = data;
    const { price } = data;
    const { sizes } = data;
    for (const size of sizes) {
      const add_size = document.createElement('div');
      add_size.classList.add('size');
      add_size.innerHTML = size;
      product_sizes.appendChild(add_size);
    }
    const { note } = data;
    const { place } = data;
    const { texture } = data;
    const { title } = data;
    const { wash } = data;
    add_img.setAttribute('src', main_image);
    product_id.innerHTML = id;
    product_name.innerHTML = title;
    product_price.innerHTML += `TWD. ${price}`;
    product_story.innerHTML = description;
    product_image.appendChild(add_img);
    product_summary.innerHTML += `${note}<br><br>${texture}<br>` + '厚薄：' + '<br>' + '彈性：' + '<br><br>' + `清洗：${wash}<br>` + `產地：${place}`;
    const { variants } = data;
    // trans rbg to hex type
    function rgb2hex(rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      function hex(x) {
        return (`0${parseInt(x).toString(16)}`).slice(-2);
      }
      return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    // }
    const all_stock = {
    };

    for (const variant of variants) {
      const color_code = all_stock[variant.color_code] || {};
      if (Object.keys(color_code).length === 0) {
        all_stock[variant.color_code] = color_code;
      }
      color_code[variant.size] = variant.stock;
    }
    // add color first stock current
    const cart_orders_initial = {
      freight: 60,
      list: [],
      payment: 'credict_card',
      recipient: {
        name: '',
        phone: '',
        email: '',
        address: '',
        time: 'anytime',
      },
      shipping: 'delivery',
      subtotal: 0,
      total: 60,
    };
    const cart_orders = {
      freight: 60,
      list: [],
      payment: 'credict_card',
      recipient: {
        name: '',
        phone: '',
        email: '',
        address: '',
        time: 'anytime',
      },
      shipping: 'delivery',
      subtotal: 0,
      total: 60,
    };
    const order = {
      main_image,
      title,
      id,
      color: variants[0].color_code,
      color_name: data.colors[0].name,
      size: variants[0].size,
      amount: '1',
      price,
      max_amount: '',
      subtotal: price,
    };
    for (let i = 0; i < Object.keys(all_stock).length; i++) {
      if (Object.values(all_stock[colors[i].code])[i] > 0) {
        const first_color_stock = Object.keys(all_stock[colors[0].code]);
        // add class
        const sizes = document.querySelectorAll('.size');
        for (const size of sizes) {
          if (size.innerHTML === first_color_stock[i]) {
            size.classList.add('current');
          }
        }
        order.max_amount = Object.values(all_stock[colors[0].code])[i];
        order.color = Object.keys(all_stock)[i];
        order.color_name = data.colors[i].name;
        break;
      }
    }
    product_details.addEventListener('click', (e) => {
      const opp = document.getElementById('opvalue');
      // set initial
      function resetamount() {
        opp.textContent = 1;
        order.amount = 1;
      }
      // color
      if (e.target.classList.contains('color')) {
        const s_colors = document.querySelectorAll('.color');
        for (const color of s_colors) {
          if (color.classList.contains('current')) {
            color.classList.remove('current');
          }
        }
        e.target.classList.add('current');
        const click_color = rgb2hex(getComputedStyle(e.target).getPropertyValue('background-color')).toUpperCase();

        order.color = click_color;
        for (const color of colors) {
          if (color.code === click_color) {
            order.color_name = color.name;
          }
        }
        // reset amount and first size
        resetamount();
        const s_sizes = document.querySelectorAll('.size');
        for (const size of s_sizes) {
          const stock_s = all_stock[click_color][size.innerHTML];
          if (stock_s) {
            size.classList.remove('disabled');
            size.classList.remove('current');
          } else {
            size.classList.add('disabled');
            size.classList.remove('current');
          }
        }
        for (const size of s_sizes) {
          const size_current = all_stock[click_color][size.innerHTML];
          if (size_current) {
            size.classList.add('current');
            console.log(size_current);
            order.max_amount = size_current;
            break;
          }
        }
      }
      // number
      if (e.target.classList.contains('op')) {
        const addres = +opp.textContent + +e.target.dataset.value;
        if (order.max_amount >= addres && addres > 0) {
          opp.textContent = addres;
          order.amount = opp.textContent;
          order.subtotal = parseInt(opp.textContent) * parseInt(price);
        }
      }
      // size
      if (e.target.classList.contains('disabled')) {
        return;
      } if (e.target.classList.contains('size')) {
        const s_sizes = document.querySelectorAll('.size');
        for (const size of s_sizes) {
          if (size.classList.contains('current')) {
            size.classList.remove('current');
          }
          resetamount();
          e.target.classList.add('current');
          for (const size of s_sizes) {
            if (size.innerHTML === e.target.innerHTML) {
              order.max_amount = all_stock[order.color][e.target.innerHTML];
            }
          }
        }
        order.size = e.target.innerHTML;
      }
      // console.log(order)
      // store into local
      if (e.target.id === 'product-add-cart-btn') {
        const cartList = JSON.parse(localStorage.getItem('cart_order')) || cart_orders_initial;
        const final_check_size = document.getElementsByClassName('size current');
        order.size = final_check_size[0].innerHTML;
        cartList.list.push(order);
        cart_orders.list.push(order);
        cartList.subtotal = 0;
        for (const item of cartList.list) {
          cartList.subtotal += +item.subtotal;
        }
        cartList.total = +cartList.subtotal + +cartList.freight;
        localStorage.setItem('cart_order', JSON.stringify(cartList));
        alert(`${order.title} 數量：${order.amount} 已加入購物車`);
        cart_qty.innerHTML = cartList.list.length;
        cart_qty_mobile.innerHTML = cartList.list.length;
      }
    });
  }));

function show_cata(category) {
  const cat_index = categories.indexOf(category);
  $('nav.container div').eq(cat_index).addClass('current');
  $('nav.mobile div').eq(cat_index).addClass('current');
}
