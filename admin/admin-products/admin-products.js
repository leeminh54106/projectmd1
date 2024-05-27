let CATEGORY_LOCAL = 'categorys';
let PRODUCTS_LOCAL = 'products'
let productBody = document.getElementById('tbody')



let formName = document.getElementById('name')
let formCategory = document.getElementById('category')
let formModalImg = document.getElementById('modalImg')
let formPrice = document.getElementById('price')
let formQuantity = document.getElementById('quantity')
let formDescription = document.getElementById('description')
let formStatus = document.getElementById('status')
let btnSearch = document.getElementById('btn-search')


//B1: thay đổi trạng thái add -> update -------------------------------------------add->update
let idUpdate = null;
let textSearch = "";


let formAdminProduct = document.getElementById('formAdminProduct');
//B2:khởi tạo biến hình ảnh
let imgProduct = document.getElementById('imgProduct');

let imageBase64 = null;
let pageSize = 5;       //cho 5 phần tử vào 1 trang
let totalPage = 1;
let currentPage = 1;
//phân trang
const pageList = document.getElementById('page-list');


//bước add danh mục
function renderCategory() {
    const categories = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
    let stringHTML = ``;
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].status) {
            stringHTML +=
                `
            <option value="${categories[i].id}">${categories[i].name}
            </option>
                `
        }
    }
    category.innerHTML = stringHTML;
}
renderCategory();


function convertToBase64() {
    let fileInput = document.getElementById('modalImg')

    let file = fileInput.files[0]   //lấy cái ảnh đầu tiên để chuyển đổi ảnh sang base 64
    let reader = new FileReader();  //đọc dữ liệu của hình ảnh
    reader.onload = function (e) {  //lưu lại dữ liệu đã conver được
        const base64 = e.target.result;
        imageBase64 = base64;

        //hiển thị hình ảnh trong form khi click vào trọn tệp
        imgProduct.src = imageBase64;
    }
    reader.readAsDataURL(file);
}

function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

function render() {
    //danh mục sản phẩm
    let categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || []
    //các sản phẩm
    let products = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL)) || []
    //search sản phẩm----------------search
    products = products.filter(item => item.name.toLowerCase().includes(textSearch));

    let stringHTML = '';
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > products.length) {
        end = products.length;
    }            //start là điểm bắt đầu, end là kết thúc
    for (let i = start; i < end; i++) {

        //khởi tạo biến xét tên id (sản phẩm) có trùng với id (danh mục) ko?
        let category = categorys.find(el => el.id === products[i].categoryId)
        //nối chuỗi
        stringHTML +=
            `
            <tr>
                <td >${i + 1}</td>
                <td >${products[i].name}</td>
                <td >${category.name}</td>
                <td class="table-th">
                    <img width='100px' class = "table-imgs" src="${products[i].image}" alt="img">
                </td>
                <td >${products[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                <td >${products[i].quantity}</td>
                <td class="table-th">
                    ${products[i].status ? `Active` : `Block`}
                </td>
                <td class="table-th">
                    <button class="btn-active" onClick="changeStatus(${products[i].id})">
                        ${products[i].status ? `<div class="block-none">Block</div>` : `<div class="block-active">Active</div>`}
                    </button>

                    <button class= "icon-btn" onclick="updateProduct(${products[i].id})">
                        <i class="icon edit-icon fa-solid fa-file-pen"></i>
                    </button>

                    <button class="icon-btn" onclick="deleteProduct(${products[i].id})">
                        <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                    </button>
                </td>
            </tr>
        `
    }


   
    productBody.innerHTML = stringHTML;
    renderPagination(products);

}

render()

function submitFormProducts(event) {
    event.preventDefault();

    // phan nay la cua update
    if (idUpdate) {
        let products = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL)) || [];
        const indexProductCu = products.findIndex(el => el.id === idUpdate);

        const productMoi = {
            id: products[indexProductCu].id,
            name: formName.value,
            categoryId: +formCategory.value,
            price: +formPrice.value,
            quantity: +formQuantity.value,
            description: formDescription.value,
            image: imageBase64,
            status: products[indexProductCu].status
        }

        const check = checkFields(productMoi);

        if (check) {
            let products = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL)) || [];
            let checkName = true
            for (let i = 0; i < products.length; i++) {
                if (products[indexProductCu].name === productMoi.name) {
                    continue;
                }
                if (products[i].name === productMoi.name) {
                    checkName = false
                    break
                }
            }

            if (checkName) {
                products[indexProductCu] = productMoi
                // luwu lwn
                localStorage.setItem('products', JSON.stringify(products))
                //render

                // xoa form
                clearForm()
                render();

            } else {
                alert("Ten bi trung")
            }
        }
        return
    }

    // phan nay la cua them
    const product = {
        id: Math.floor(Math.random() * 1000000),
        name: formName.value,
        categoryId: +formCategory.value,
        price: +formPrice.value,
        quantity: +formQuantity.value,
        description: formDescription.value,
        status: true,
        image: imageBase64,
    }
    const check = checkFields(product);
    if (check) {
        let products = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL)) || [];
        let checkName = true
        for (let i = 0; i < products.length; i++) {
            if (products[i].name === product.name) {
                checkName = false
                break
            }
        }

        if (checkName) {
            // them
            products.push(product);
            // luwu lwn
            localStorage.setItem('products', JSON.stringify(products))
            //render

            // xoa form
            formName.value = '';
            formCategory.value = '';
            formPrice.value = '';
            formQuantity.value = '';
            formDescription.value = '';
            imageBase64 = null;
            render();

        } else {
            alert("Ten bi trung")
        }
    }
}

function checkFields(product) {

    if (product.name.length < 2) {
        alert('tên không được < 2 kí tự')
        return false
    }
    if (product.image == null) {
        alert('chưa có ảnh')
        return false
    }

    if (product.price == '') {
        alert('chưa nhập giá')
        return false
    }
    if (product.quantity == '') {
        alert('chưa nhập số lượng')
        return false
    }

    return true;
}

function changeStatus(id) {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL)) || []

    let index = products.findIndex(el => el.id === id)
    products[index].status = !products[index].status
    localStorage.setItem('products', JSON.stringify(products))

    render()
}


function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL)) || []
    let index = products.findIndex(el => el.id === id)
    products.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(products))
    render()
}

function updateProduct(id) {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL)) || []
    // let categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || []

    let index = products.findIndex(el => el.id === id)
    // let i = categorys.findIndex(el => el.id === products[index].categoryId)

    formName.value = products[index].name;
    formCategory.value = products[index].categoryId;
    imgProduct.src = products[index].image;
    formPrice.value = products[index].price;
    formQuantity.value = products[index].quantity;
    formDescription.value = products[index].description;

    //B2:  -------------------------------------------add->update
    idUpdate = id;
    document.getElementById('submit-form').innerText = 'Sửa';
    imageBase64 = products[index].image;
}

//B3:  -------------------------------------------add->update
function clearForm() {
    formName.value = '';
    formCategory.value = '';
    imgProduct.src = '';
    formPrice.value = '';
    formQuantity.value = '';
    formDescription.value = '';
    document.getElementById('submit-form').innerText = 'Thêm';
    idUpdate = null;
    imageBase64 = null
}
//seach

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    textSearch = document.getElementById('text-search').value.toLowerCase();
    currentPage = 1;

    render()
})



// phân trang B1: vẽ giao diện-----------------phân trang 
function renderPagination(users) {

    totalPage = Math.ceil(users.length / pageSize); // làm tròn lên VD:3,0004 -> 4
    let stringHTML = ``;
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML +=
                ` 
                    <p class="pagination-p pagination-active" onclick="clickPage(${i})">${i}</p>
                `
        }
        else {
            stringHTML +=
                `
                    <p class="pagination-p  " onclick="clickPage(${i})">${i}</p>
                `
        }
    }
    pageList.innerHTML = stringHTML;
}

// B2: ấn vào v:1,2,3,4-----------------phân trang 
function clickPage(i) {
    currentPage = i;
    render()
}
//B3: button 2 bên (lùi về, tiến lên)
function changePage(status) {
    if (status === -1 && currentPage > 1) {
        currentPage -= 1;
    }
    if (status === 1 && currentPage < totalPage) {
        currentPage += 1;
    }
    render();
}
function changePageSize(e) {
    pageSize = e.target.value;
    currentPage = 1;
    render();
}
