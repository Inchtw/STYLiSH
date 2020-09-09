const orderformlocal = localStorage.getItem('cart_order');
const cart_List = document.getElementById('cart-list');
const cart_total = document.getElementById('total');
const cart_subtotal = document.getElementById('subtotal');
const cart_freight = document.getElementById('freight');
const cart_qty_mobile = document.getElementById('cart-qty-mobile');
const cart_qty = document.getElementById('cart-qty');

initial_cart();

function initial_cart() {
  if (localStorage.getItem('cart_order')) {
    try {
      const cart_orders = JSON.parse(localStorage.getItem('cart_order'));
      cart_qty.innerHTML = cart_orders.list.length;
      cart_qty_mobile.innerHTML = cart_orders.list.length;
      if (cart_orders.list[0] === undefined) {
        show_no_order();
      }
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

  if (orderformlocal) {
    const cart_orders = JSON.parse(orderformlocal);
    const orders = cart_orders.list;
    for (const order of orders) {
      const { main_image } = order;
      const { title } = order;
      const { color_name } = order;
      const { id } = order;
      const { size } = order;
      const { amount } = order;
      const { max_amount } = order;
      const { price } = order;
      const subtotal = +price * +amount;
      const add_row = document.createElement('div');
      const add_variant = document.createElement('div');
      add_variant.classList.add('variant');
      const add_picture = document.createElement('div');
      add_picture.classList.add('picture');
      const add_img = document.createElement('img');
      add_img.setAttribute('src', main_image);
      const add_details = document.createElement('div');
      add_details.classList.add('details');
      add_details.innerHTML = `${title}<br>${id}<br><br>` + `顏色：${color_name}<br>` + `尺寸：${size}`;
      add_variant.appendChild(add_picture);
      add_picture.appendChild(add_img);
      add_variant.appendChild(add_details);
      const add_qty = document.createElement('div');
      add_qty.classList.add('qty');
      const select_qty = document.createElement('select');
      for (let i = 0; i < parseInt(max_amount); i++) {
        const add_option = document.createElement('option');
        add_option.setAttribute('value', parseInt(i) + 1);
        add_option.innerHTML = parseInt(i) + 1;
        if (parseInt(i) + 1 === parseInt(amount)) {
          add_option.setAttribute('selected', 'selected');
        }
        select_qty.appendChild(add_option);
      }
      add_qty.appendChild(select_qty);

      const add_price = document.createElement('div');
      add_price.classList.add('price');
      add_price.innerHTML = `NT. ${price}`;
      const add_subtotal = document.createElement('div');
      add_subtotal.classList.add('subtotal');
      add_subtotal.innerHTML = `NT. ${subtotal}`;

      const add_remove = document.createElement('div');
      add_remove.classList.add('remove');
      const add_remove_button = document.createElement('img');
      const add_remove_button_hover = document.createElement('img');
      add_remove_button.setAttribute('src', './images/cart-remove.png');
      add_remove_button_hover.setAttribute('src', './images/cart-remove-hover.png');
      add_remove.appendChild(add_remove_button);
      add_remove.appendChild(add_remove_button_hover);
      add_row.classList.add('row');
      add_row.appendChild(add_variant);
      add_row.appendChild(add_qty);
      add_row.appendChild(add_price);
      add_row.appendChild(add_subtotal);
      add_row.appendChild(add_remove);
      cart_List.appendChild(add_row);
    }
    // total $$
    show_totoal_price(cart_orders);
    const form_button = document.getElementById('checkout');
    // if cart is not empty
    if (cart_orders.list.length > 0) {
      form_button.disabled = false;
    }
  } else {
    show_no_order();
  }
}
// remove event
cart_List.addEventListener('click', (e) => {
  const child = e.target.parentNode.parentNode;
  const parent = e.target.parentNode.parentNode.parentNode;
  const order_index = Array.prototype.indexOf.call(parent.children, child);
  if (e.target.parentNode.classList.contains('remove')) {
    // let child = e.target.parentNode.parentNode
    // let parent = e.target.parentNode.parentNode.parentNode
    // let order_index = Array.prototype.indexOf.call(parent.children, child);
    // with index delete local storage data
    if (order_index >= 0) {
      const cart_orders = JSON.parse(localStorage.getItem('cart_order'));
      const orders = cart_orders.list;
      const { subtotal } = cart_orders;
      const { total } = cart_orders;
      const remove_item = orders[order_index];
      cart_orders.subtotal = +subtotal - +remove_item.subtotal;
      cart_orders.total = +total - +remove_item.subtotal;
      console.log(order_index);
      orders.splice(order_index, 1);
      cart_orders.list = orders;
      if (orders[0] === undefined) {
        show_no_order();
        const form_button = document.getElementById('checkout');
        form_button.disabled = true;
      }
      localStorage.setItem('cart_order', JSON.stringify(cart_orders));
      show_totoal_price(cart_orders);
      parent.removeChild(child);
      alert(`已移除${remove_item.title}`);
    }
  } else if (e.target.parentNode.classList.contains('qty')) {
    // try to change amount use jquery
    $('.qty select').on('change', function () {
      const cart_orders = JSON.parse(localStorage.getItem('cart_order'));
      const orders = cart_orders.list;
      const row_index = $(this).parent().parent().prevAll().length;
      const { price } = orders[row_index];
      const { subtotal } = orders[row_index];
      const new_amount = $('option:selected', this).text();
      cart_orders.list[row_index].amount = new_amount;
      cart_orders.list[row_index].subtotal = +new_amount * price;
      const change = +new_amount * price - +subtotal;
      cart_orders.subtotal += +change;
      cart_orders.total += +change;
      $(this).parent().parent().children('.subtotal')
        .html(`NT. ${+new_amount * price}`);
      localStorage.setItem('cart_order', JSON.stringify(cart_orders));
      show_totoal_price(cart_orders);
    });
  }
});

// for safari code
window.addEventListener('mousedown', (e) => {
  if (e.target.parentNode.classList.contains('qty')) {
    // try to change amount use jquery
    $('.qty select').on('change', function () {
      const cart_orders = JSON.parse(localStorage.getItem('cart_order'));
      const orders = cart_orders.list;
      const row_index = $(this).parent().parent().prevAll().length;
      const { price } = orders[row_index];
      const { subtotal } = orders[row_index];
      const new_amount = $('option:selected', this).text();
      cart_orders.list[row_index].amount = new_amount;
      cart_orders.list[row_index].subtotal = +new_amount * price;
      const change = +new_amount * price - +subtotal;
      cart_orders.subtotal += +change;
      cart_orders.total += +change;
      $(this).parent().parent().children('.subtotal')
        .html(`NT. ${+new_amount * price}`);
      localStorage.setItem('cart_order', JSON.stringify(cart_orders));
      show_totoal_price(cart_orders);
    });
  }
});

function show_no_order() {
  const add_empty = document.createElement('h4');
  add_empty.setAttribute('style', 'margin-left:20px;');
  add_empty.innerHTML = '購物車空空的耶';
  cart_List.appendChild(add_empty);
  cart_qty.innerHTML = 0;
  cart_qty_mobile.innerHTML = 0;
}
function show_totoal_price(cart_orders) {
  const orders = cart_orders.list;
  cart_freight.innerHTML = cart_orders.freight;
  cart_subtotal.innerHTML = cart_orders.subtotal;
  cart_total.innerHTML = cart_orders.total;
  cart_qty.innerHTML = orders.length;
  cart_qty_mobile.innerHTML = orders.length;
}
