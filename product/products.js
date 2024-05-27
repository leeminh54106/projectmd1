let productContent = document.getElementById('product-detail')
let pdcidName = document.getElementById('pdcid-name')
let pdcidPrice = document.getElementById('pdcid-price')
let pdcidDescription = document.getElementById('pdcid-description')
let pdcidImg = document.getElementById('pdcid-img')

//cart
let addToCard = document.getElementById('addToCard')

function render() {

    let productDetail = JSON.parse(localStorage.getItem('productDetail')) || {}
    let products = JSON.parse(localStorage.getItem('products')) || []

    let index = products.findIndex(el => el.id == productDetail.productId)
    // console.log(products[index]);
    pdcidName.innerHTML = products[index].name;
    pdcidPrice.innerHTML = products[index].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    pdcidDescription.textContent = products[index].description;
    pdcidImg.src = products[index].image
}

render()

let numbercongtru = document.getElementById('numbercongtru');

function numbercong() {
    numbercongtru.value = +numbercongtru.value + 1;
}
function numbertru() {
    if (numbercongtru.value > 1) {

        numbercongtru.value = +numbercongtru.value - 1;
    }
}




addToCard.addEventListener('click', () => {
    let productDetail = JSON.parse(localStorage.getItem('productDetail')) || {}
    let userLogin = JSON.parse(localStorage.getItem('user-login')) || {}

    if (!userLogin.id) {
        alert("Ban chua dang nhap !!!")
    }

    let cartItem = {
        productId: productDetail.productId,
        quantity: +numbercongtru.value,
        userId: userLogin.id,
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || []

    const cartItemIndex = cart.findIndex(el => el.productId == cartItem.productId)

    if (cartItemIndex != -1) {
        cart[cartItemIndex].quantity += +cartItem.quantity
        localStorage.setItem('cart', JSON.stringify(cart))
        return
    }

    cart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cart))
    totalCart();
})



const countCart = document.getElementById("countCart");
totalCart();
function totalCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count++
    }
    countCart.innerHTML = count;
}

const logoutBtn = document.getElementById('logoutBtn');

//xóa login thêm logout
function checklogin() {
    //xóa nick đăng nhập
    let deleteLogin = JSON.parse(localStorage.getItem('user-login'));
    if (deleteLogin && deleteLogin.email) {

        let loginBtn = document.getElementById('loginHome');
        let rigisterHome = document.getElementById('rigisterHome');
        let nameEmail = document.getElementById('nameEmail');
        nameEmail.innerHTML = `${deleteLogin.email}`;
        logoutBtn.classList.remove("logoutBtn")

        loginBtn.style.display = 'none'
        if (rigisterHome) rigisterHome.remove();
    }
}

checklogin()