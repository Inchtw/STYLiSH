const urlParam = new URLSearchParams(window.location.search)
let order_number = urlParam.get('number');

const or_number = document.getElementById('number')

or_number.innerHTML = order_number