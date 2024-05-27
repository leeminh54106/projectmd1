//xóa login thêm logout
function checklogin() {
    //xóa nick đăng nhập
    const logoutBtn = document.getElementById('logoutBtn');
    let deleteLogin = JSON.parse(localStorage.getItem('user-login'));
    if (deleteLogin && deleteLogin.email) {

        logoutBtn.classList.remove('logoutBtn');

        let loginBtn = document.getElementById('loginHome');
        let rigisterHome = document.getElementById('rigisterHome');
        let nameEmail = document.getElementById('nameEmail');
        nameEmail.innerHTML = `${deleteLogin.email}`;

        if (loginBtn) loginBtn.remove(); // Kiểm tra và xóa loginBtn nếu tồn tại
        if (rigisterHome) rigisterHome.remove(); // Kiểm tra và xóa rigisterHome nếu tồn tại
    }
}

checklogin();

let tBody = document.getElementById('tBody');

// phan tinh tong tien
let totalMoney = 0;

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || []
    let stringHTML = ``;
    let total = 0;

    // phan tinh tong tien
    totalMoney = 0;

    for (let i = 0; i < cart.length; i++) {
        let productId = products.find(item => item.id == cart[i].productId)
        total = productId.price * cart[i].quantity;

        // phan tinh tong tien ****
        totalMoney += total;

        stringHTML +=
            `
                <tr class="cart-checkout-table-tr">
                    <td class="cart-checkout-table-td">
                        <div class="table-td-photo">
                            <img class="table-td-photo-img"
                                src="${productId.image}" alt="">
                        </div>
                    </td>
                    <td class="cart-checkout-table-td">
                        ${productId.name}
                    </td>
                    <td class="cart-checkout-table-td">
                    ${productId.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </td>

                    <td class="cart-checkout-table-td">
                        <div class="h_blockcart-inner--qty">
                            <button onclick="numbertru(${cart[i].productId})" class="h_blockcart-inner-minus">
                                -
                            </button>
                            <input id="numbercongtru" type="text" class="h_blockcart-inner--input" value="${cart[i].quantity}">
                            <button onclick="numbercong(${cart[i].productId})" class="h_blockcart-inner-plus">
                                +
                            </button>
                        </div>
                    </td>
                    <td class="cart-checkout-table-td">
                        ${total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </td>
                    <td>
                        <button onclick='deleteCartItem(${cart[i].productId})'>DELETE</button>
                    </td>
                </tr>
            `

    }
    tBody.innerHTML = stringHTML;

    // phan tinh tong tien
    document.getElementById('total-money').innerText = totalMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    document.getElementById('temp-money').innerText = totalMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
renderCart()

function clearForm() {
    localStorage.removeItem("cart");
    renderCart();
}

function countCart() {
    let countCart = document.getElementById('countCart')
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    let count = 0;
    for (let i = 0; i < cart.length; i++) {

        count++;

    }
    countCart.innerHTML = count;
}
countCart()

function deleteCartItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let userLogin = JSON.parse(localStorage.getItem('user-login')) || {};

    const index = cart.findIndex(el => el.productId == id && el.userId == userLogin.id)

    if (index != -1) {
        cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    renderCart()
}



let numbercongtru = document.getElementById('numbercongtru');

// function total (){
// let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     let index = cart.findIndex(el => el.id == cart.id)
//     cart[index].quantity = quantity;


//     numbercong(cart)
// }


function numbercong(id) {
    let userLogin = JSON.parse(localStorage.getItem('user-login')) || []
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cart.findIndex(el => el.productId == id && el.userId == userLogin.id)
    if (index != -1) {
        cart[index].quantity += 1
        localStorage.setItem("cart", JSON.stringify(cart))
        renderCart()
    }
}

function numbertru(id) {
    let userLogin = JSON.parse(localStorage.getItem('user-login')) || []
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cart.findIndex(el => el.productId == id && el.userId == userLogin.id)
    if (index != -1 && cart[index].quantity >= 2) {
        cart[index].quantity -= 1
        localStorage.setItem("cart", JSON.stringify(cart))
        renderCart()
    }
}

