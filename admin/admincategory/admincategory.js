

const btnAdd = document.getElementById("btn-add")
const form = document.getElementById("form-scope")
const categoryName = document.getElementById('name')
const errorName = document.getElementById("error-name")
const btnCancel = document.getElementById("btn-cancel")
const btnSubmit = document.getElementById("btn-submit")
const tableCategory = document.getElementById("tbody")

// phân trang
let pageList = document.getElementById('page-list');
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
//phân trang ^

let idUpdate = null;

const CATEGORY_LOCAL = "categorys";

btnAdd.addEventListener('click', function () {
    form.classList.remove('hidden')
})

btnCancel.addEventListener("click", function () {
    categoryName.value = '';
    errorName.innerHTML = '';
    btnSubmit.innerText = "Add";
    idUpdate = null;
    form.classList.add("hidden");
})
function submitForm(event) {
    event.preventDefault();
    if (idUpdate) {
        const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
        if (categoryName.value.length < 2) {
            errorName.innerText = `Lỗi`;
            return;
        } else {
            errorName.innerText = ``;
        }

        const index = categorys.findIndex(item => item.name === categoryName.value)
        if (index !== -1) {
            errorName.innerText = "Name bị trùng";
            return
        }
        else {
            errorName.innerText = "";
        }
        const indexUpdate = categorys.findIndex(item => item.id === idUpdate)
        categorys[indexUpdate].name = categoryName.value;
        localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

        btnCancel.click()

        idUpdate = null;
        render()



        return
    }
    else {
        errorName.innerText = "";
    }

    let id = 1;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
    if (categorys.length > 0) {
        id = categorys[categorys.length - 1].id + 1
    }
    if (categoryName.value.length < 2) {
        errorName.innerText = `Lỗi`;
        return;
    } else {
        errorName.innerText = ``;
    }

    const index = categorys.findIndex(item => item.name === categoryName.value)
    if (index !== -1) {
        errorName.innerText = "Name bị trùng";
        return
    }
    else {
        errorName.innerText = "";
    }
    const category = {
        id,
        name: categoryName.value,
        status: true,

    }

    categorys.push(category)

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))


    categoryName.value = "";

    form.classList.add("hidden")

    render();

}

function render(data) {
    let categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL));
    if (Array.isArray(data)) { //kiểm tra xem nó có phải mảng hay không
        categorys = data
    }

    let stringHTML = ``;
    //phân trang-------------------
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (categorys.length < end) {
        end = categorys.length
    }

    for (let i = 0; i < categorys.length; i++) {
        if (i >= start && i < end) {
            stringHTML +=
                `
                <tr>
                    <td>${i + 1}</td>
                    <td>${categorys[i].name}</td>
                    <td>${categorys[i].status ? "Active" : "Block"}</td>
                    <td>
                        <button class="admin-table-button" onclick="initUpdate(${categorys[i].id})">Update</button>
                        <button class="admin-table-button" onclick="changeStatus(${categorys[i].id})">${categorys[i].status ? "Block" : "Active"}</button>
                        <button class="admin-table-button" onclick="deleteCategorys(${categorys[i].id})">Delete</button>
                    </td>
                </tr>
            `
        }
    }
    tableCategory.innerHTML = stringHTML;

    //phân trang---------------------------------------
    renderPagination(categorys)
}
render();


function deleteCategorys(id) {

    const result = confirm(`Are you sure delete id:${id}`)
    if (!result) {
        return;
    }
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id);

    categorys.splice(index, 1)
    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys));

    render();
}


function initUpdate(id) {
    idUpdate = id;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categoryName.value = categorys[index].name;
    form.classList.remove("hidden")
    btnSubmit.innerText = "Update";
}

function changeStatus(id) {
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categorys[index].status = !categorys[index].status

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

    render();
}

let logoutAdmin = document.getElementById('logoutAdmin');
logoutAdmin.addEventListener('click', () => {
    localStorage.removeItem("adminLogin");
})

// phân trang B1: vẽ giao diện-----------------phân trang 
function renderPagination(categorys) {
    let stringHTML = ``;
    totalPage = Math.ceil(categorys.length / pageSize); // làm tròn lên VD:3,0004 -> 4
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML +=
                ` 
                    <span class="pagination-p pagination-active" onclick="clickPage(${i})">${i}</span>
                `
        }
        else {
            stringHTML +=
                `
                    <span class="pagination-p  " onclick="clickPage(${i})">${i}</span>
                `
        }
    }
    pageList.innerHTML = stringHTML;
}

//B2: button 2 bên (lùi về, tiến lên)
function clickPage(i) {
    currentPage = i;
    render()
}