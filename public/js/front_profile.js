const login_content = document.querySelector('.login--content');
const register_content = document.querySelector('.register--content');
const profile_photo = document.getElementById('profile_photo');
const profile_default_img = document.getElementById('profile_default_img');
const profile_id = document.getElementById('profile_id');
const profile_name = document.getElementById('profile_name');
const user_token = localStorage.getItem('user_token') || false;

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
if (user_token) {
  const { access_token } = JSON.parse(user_token);
  const sign_uri = '/user/profile';
  fetch(sign_uri, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  })

    .then((res) => res.json())
    .catch((error) => {
      alert('登入逾時 請重新登入');
      window.location.reload('/profile.html');
      console.error(error);
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_info');
    })
    .then((info) => {
      $('.login--content').hide();
      $('.register--content').hide();
      $('.profile').show();
      const { data } = info;
      const { id } = data;
      const { name } = data;
      const { picture } = data;
      const add_id = document.createElement('span');
      add_id.innerHTML = id;
      profile_id.appendChild(add_id);
      const add_name = document.createElement('span');
      add_name.innerHTML = name;
      profile_name.appendChild(add_name);
      if (picture === null || picture === '') {
      // console.log("use defalut photo")
      } else {
        profile_default_img.remove();
        const add_img = document.createElement('img');
        add_img.setAttribute('src', picture);
        profile_photo.appendChild(add_img);
      }
    });
} else {
  // $(".login--content").show();
  // $(".register--content").show();
  $('.profile').hide();
}

function sendSignUPData() {
  const name = document.getElementById('signup_name').value;
  const email = document.getElementById('signup_email').value;
  const password = document.getElementById('signup_password').value;
  const uri = '/user/signup';
  fetch(uri, {
    method: 'POST',
    body: JSON.stringify({
      provider: 'native',
      name,
      email,
      password,

    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.data) {
        alert(`Welcome come! ${name}`);
        const result_data = {};
        result_data.access_token = result.data.access_token;
        localStorage.setItem('user_token', JSON.stringify(result_data));
        localStorage.setItem('user_info', JSON.stringify(result.data.user));
        location.reload();
      } else {
        alert(result.error);
        location.reload();
      }
    });
}

function sendSignINData() {
  const email = document.getElementById('signin_email').value;
  const password = document.getElementById('signin_password').value;
  const uri = '/user/signin';
  fetch(uri, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      provider: 'native',
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((user_info) => {
      if (user_info.data) {
        const { data } = user_info;
        const token = {};
        token.access_token = data.access_token;
        const { user } = data;
        const { name } = user;
        alert(`Welcome come! ${name}`);
        localStorage.setItem('user_token', JSON.stringify(token));
        localStorage.setItem('user_info', JSON.stringify(user));
        location.reload();
      } else {
        alert(user_info.error);
        location.reload();
      }
    });
}

function logout() {
  const ans = confirm('確定登出嗎？');
  if (ans === true) {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_info');
    location.reload();
  } else {
    location.reload();
  }
}

$('.btn').click((e) => {
  e.preventDefault();
  $('.login--content').slideDown(600);
  $('.register--content').slideUp(600);
});

$('.btn-reg').click((e) => {
  e.preventDefault();
  $('.login--content').slideUp(600);
  $('.register--content').slideDown(600);
});
