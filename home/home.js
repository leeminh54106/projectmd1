//Khởi tạo account admin và check xem trong database có tài khoản admin chưa
function find() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  //Khởi tạo account admin có các trường...
  let admin = {
    id: 1,
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "admin",
    status: true,
  };
  //tạo mảng chứa account
  let admins = [];
  //push account vào mảng
  admins.push(admin);
  // console.log(userList.findIndex(item=>item.email === email.value));
  //tìm vị trí account trong mảng
  let userIdIndex = userList.findIndex((item) => item.email === admin.email);
  if (userIdIndex < 0) {
    //trường hợp không có account trong database thì push account admin lên database
    localStorage.setItem("userList", JSON.stringify(admins));
  } else {
    //không làm j vì đã có tài khoản
  }
}
find();




logoutBtn.addEventListener('click', () => {
  localStorage.removeItem("user-login");
})

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


//in sản phẩm ra ngoài màn hình

let bestseller = document.getElementById('bestseller');

let products = JSON.parse(localStorage.getItem('products'));

function renderBestseller() {
  let stringHTML = ``;
  for (let i = 0; i < products.length; i++) {

    stringHTML += `
        <div class="bestseller-container">
                    <div  onclick ="changepage(${products[i].id})" class="bestseller-container-photo"
                        style="background-image: url(${products[i].image});">
                    </div>
                    <div class="bestseller-container-paper">
                        <h3>
                            <a  onclick ="changepage(${products[i].id})" >
                                ${products[i].name}
                            </a>
                        </h3>
                        <span>
                           ${products[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </span>
                        <a class="bcp-cart" href="">
                            Thêm vào giỏ hàng
                        </a>
                        <a class="color-orange bold" href="">
                            Mua ngay
                        </a>
                    </div>
                </div>
    `
  }
  bestseller.innerHTML = stringHTML;
}

renderBestseller();

function changepage(id) {
  let productDetail = {
    productId: id,
  };

  localStorage.setItem('productDetail', JSON.stringify(productDetail))
  window.location.href = "http://127.0.0.1:5502/product/product.html";
}

let countCart1 = document.getElementById('countCart');

function countCart(){
  let cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart);
  let count = 0;
  for(let i = 0; i < cart.length; i++){

    count++;

  }
  countCart1.innerHTML = count;
}
countCart()