const urlParam = new URLSearchParams(window.location.search)
let urlCatgory = urlParam.get('tag');
// let products_url = `/api/1.0/products/all?paging=0`
let new_paging = 0 // for scroll 
let products_url = `/api/1.0/products/all?paging=${new_paging}`
const categories = ['women', 'men', 'accessories'];
if (categories.includes(urlCatgory)) {
    products_url = `/api/1.0/products/${urlCatgory}?paging=0`
    let cat_index = categories.indexOf(urlCatgory)
    $('nav.container div').eq(cat_index).addClass('current')
    $('nav.mobile div').eq(cat_index).addClass('current')

}else if(urlCatgory){
    products_url = `/api/1.0/products/search?keyword=${urlCatgory}`
}

const products = document.querySelector(".products")
const cart_qty_mobile = document.getElementById("cart-qty-mobile")
const cart_qty = document.getElementById("cart-qty")
      cart_qty.innerHTML = 0
      cart_qty_mobile.innerHTML = 0

if(localStorage.getItem('cart_order')){
        try{
        let cartList = JSON.parse(localStorage.getItem('cart_order'))
        cart_qty.innerHTML = cartList.list.length
        cart_qty_mobile.innerHTML = cartList.list.length
    }catch(error){
            console.log(error);
            localStorage.removeItem('cart_order');
            cart_qty.innerHTML = 0;
            cart_qty_mobile.innerHTML = 0;
        }
    }else{
        cart_qty.innerHTML = 0;
        cart_qty_mobile.innerHTML = 0; 
}


fetchProducts(products_url)



let campaigns_url = `api/1.0/marketing/campaigns`
const keyvisual = document.querySelector(".keyvisual");
const steps = document.querySelector(".step")
fetch( campaigns_url,{
    method:'GET'       
}).then(res => res.json())
.then(result =>{
    let {data} =result;
    for (let campaign of data) {
        let add_a = document.createElement('a');
        let story_a = document.createElement('div');
        let add_circle= document.createElement('div');
        add_circle.classList.add('circle')
        add_a.classList.add('visual');
        add_a.style= `background-image: url(${campaign.picture});`
        add_a.setAttribute('href',"product.html?id="+campaign.product_id)
        story_a.classList.add('story');
        story_a.innerHTML = campaign.story.replace(/\s+/g,"<br>")
        add_a.appendChild(story_a);
        keyvisual.appendChild(add_a);
        steps.appendChild(add_circle)
    }

}).then(()=>{
    // photo carousel

        const timer = 3500 ;
        // const keyvisual = document.querySelector(".keyvisual");
        const step = document.querySelector(".step");
        const visuals = keyvisual.querySelectorAll('.visual');
        const circles = step.querySelectorAll('.circle');
        const visualsCount = visuals.length;
        let interval = setInterval(showNext, timer);
        let counter = 0;

        let showCurrent = function(){
            let visualToShow = Math.abs(counter% visualsCount);
            [].forEach.call( visuals, function(el){
                el.classList.remove('current');  
                // el.style = `z-index : 1`
            });
            [].forEach.call( circles, function(el){
                el.classList.remove('circle_current');
            });
            visuals[visualToShow].classList.add('current');
            // visuals[visualToShow].style = `z-index : 2`;
            circles[visualToShow].classList.add('circle_current');
        }

        function showNext(){
            counter++; // 將 counter+1 指定下一張圖
            showCurrent();
        }

        //stop 
        keyvisual.addEventListener('mouseover', function(){
            interval = clearInterval(interval);
        });
        // reset
        keyvisual.addEventListener('mouseout', function(){
            interval = setInterval(showNext, timer);
        });
        // change 
        steps.addEventListener('click', function (e) {
            if (e.target.classList.contains("circle")) {
            let child = e.target
            let parent = this
            let circle_index = Array.prototype.indexOf.call(parent.children, child);   
            [].forEach.call( visuals, function(el){
                el.classList.remove('current');  
            });
            [].forEach.call( circles, function(el){
                el.classList.remove('circle_current');
            });
            visuals[circle_index].classList.add('current');
                circles[circle_index].classList.add('circle_current');
                counter = circle_index
         }
        });
        
    
    
        visuals[0].classList.add('current');
        circles[0].classList.add('circle_current');

    

})



$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        if (new_paging) {
            let products_url = `/api/1.0/products/all?paging=${new_paging}`
            fetchProducts(products_url)
        }
    }
});



function fetchProducts(products_url) {
    fetch(products_url, {
        method: 'GET'
    }).then(res => res.json()
        .then(result => {
            try {
                let { data } = result;
                new_paging = result.next_paging
                for (let product of data) {
                    let { id } = product
                    let { main_image } = product;
                    let { price } = product;
                    let { title } = product;
                    let { colors } = product;
                    let add_colors = document.createElement('div');
                    let add_name = document.createElement('div');
                    let add_price = document.createElement('div');
                    let add_a = document.createElement('a');
                    add_a.setAttribute('href', "product.html?id=" + id)
                    add_a.classList.add('product');
                    let add_img = document.createElement('img');
                    add_colors.classList.add('colors')
                    add_name.classList.add('name')
                    add_price.classList.add('price')
                    for (let color of colors) {
                        let { code } = color
                        let add_color = document.createElement('div');
                        add_color.classList.add('color')
                        if (code === "FFFFFF") {
                            add_color.style = `border: 0.1px solid #e7e5e5;`
                        }
                        add_color.style = `background-color: #${code}`
                        add_colors.appendChild(add_color)
                    }
                    add_price.innerHTML = `TWD. ${price}`;
                    add_name.innerHTML = title
                    add_img.setAttribute('src', main_image);
                    add_a.appendChild(add_img);
                    add_a.appendChild(add_colors);
                    add_a.appendChild(add_name)
                    add_a.appendChild(add_price)
                    products.appendChild(add_a);
                }
            } catch{
                let add_none_result = document.createElement('h2')
                add_none_result.innerHTML = "沒有搜尋到任何產品哦"
                add_none_result.classList.add('no-result')
                products.appendChild(add_none_result)
            }

        })
    )
}