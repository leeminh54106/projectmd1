// const fruitList = [
//     { id: 1, name: 'banana', email: 'banana@gmail.com', password: '123456789', status: true, role: 'user' },
//     { id: 2, name: 'apple', email: 'apple@gmail.com', password: '123123123', status: false, role: 'user' },
//     { id: 3, name: 'orange', email: 'orange@gmail.com', password: '012345678', status: true, role: 'user' },
//     { id: 4, name: 'orange', email: 'orange@gmail.com', password: '012345678', status: true, role: 'user' },
//     { id: 5, name: 'kiwi', email: 'kiwi@gmail.com', password: '12345678', status: false, role: 'user' },
//     { id: 6, name: 'dorian', email: 'dorian@gmail.com', password: '012345678', status: false, role: 'user' },
// ]
// let textSearch = '';
// let btnSearch = document.getElementById('btnSearch');
// localStorage.setItem('fruitList', JSON.stringify(fruitList));
// const tBody = document.getElementById('tBody');

// function render(){
//     let fruitList = JSON.parse(localStorage.getItem('fruitList'));
//     //filter sẽ chạy từ fruit[0] -> cuối cùng, dk item chính là fruitList
//     fruitList = fruitList.filter(item => item.name.toLowerCase().includes(textSearch)); //includes abc là 1 chuỗi thì a là chuỗi con của a
//     renderfruitList(fruitList)
// }

// render()


// function renderfruitList(fruitList) {
//     // B1:render ra tbody
   
//     let stringHTML = '';
//     for (let i = 0; i < fruitList.length; i++) {
//         stringHTML +=
//             `
//                 <tr>
//                     <td>${i + 1}</td>
//                     <td>${fruitList[i].name}</td>
//                     <td>${fruitList[i].email}</td>
//                     <td>${fruitList[i].status}</td>
//                     <td>
//                         <button onclick=(status(${fruitList[i].id}))>${fruitList[i].status ? `active` : `block`}</button>
//                     </td>
//                 </tr>
//             `;

//     }
//     tBody.innerHTML = stringHTML;

// }
 


// //B2:active ? block
// function status(id) {
//     let index = fruitList.find(el => el.id == id);
//     index.status = !index.status;

//     localStorage.setItem('fruitList', JSON.stringify(fruitList));
//     renderfruitList()
// };


// btnSearch.addEventListener('click', (e) => {
//     e.preventDefault();
//     textSearch = document.getElementById('textSearch').value.toLowerCase();

    
//     render()
// })


const fruitList = [
    { id: 1, name: 'banana', email: 'banana@gmail.com', password: '123456789', status: true, role: 'user' },
    { id: 2, name: 'apple', email: 'apple@gmail.com', password: '123123123', status: false, role: 'user' },
    { id: 3, name: 'orange', email: 'orange@gmail.com', password: '012345678', status: true, role: 'user' },
    { id: 4, name: 'orange', email: 'orange@gmail.com', password: '012345678', status: true, role: 'user' },
    { id: 5, name: 'kiwi', email: 'kiwi@gmail.com', password: '12345678', status: false, role: 'user' },
    { id: 6, name: 'dorian', email: 'dorian@gmail.com', password: '012345678', status: false, role: 'user' },
];

let textSearch = '';
let btnSearch = document.getElementById('btnSearch');
// let sortButton = document.getElementById('sortButton'); // Lấy button sắp xếp
let sortDirection = 'aes'; // Theo dõi hướng sắp xếp hiện tại, mặc định là 'aes'
localStorage.setItem('fruitList', JSON.stringify(fruitList));
const tBody = document.getElementById('tBody');

function render() {
    let fruitList = JSON.parse(localStorage.getItem('fruitList'));
    fruitList = fruitList.filter(item => item.name.toLowerCase().includes(textSearch));
    renderfruitList(fruitList);
}

render();

function renderfruitList(fruitList) {
    let stringHTML = '';
    for (let i = 0; i < fruitList.length; i++) {
        stringHTML +=
            `
                <tr>
                    <td>${i + 1}</td>
                    <td>${fruitList[i].name}</td>
                    <td>${fruitList[i].email}</td>
                    <td>${fruitList[i].status}</td>
                    <td>
                        <button onclick=(status(${fruitList[i].id}))>${fruitList[i].status ? `active` : `block`}</button>
                    </td>
                </tr>
            `;
    }
    tBody.innerHTML = stringHTML;
}

function status(id) {
    let index = fruitList.find(el => el.id == id);
    index.status = !index.status;

    localStorage.setItem('fruitList', JSON.stringify(fruitList));
    renderfruitList();
};

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    textSearch = document.getElementById('textSearch').value.toLowerCase();
    render();
});

// Thêm chức năng sắp xếp
function sortFruitList(order) {
    let sortedList = JSON.parse(localStorage.getItem('fruitList'));
    sortedList.sort((a, b) => {
        if (order === 'aes') {
            return a.name.localeCompare(b.name);
        } else if (order === 'des') {
            return b.name.localeCompare(a.name);
        }
    });
    renderfruitList(sortedList);
}

// Hàm chuyển đổi hướng sắp xếp
function toggleSort() {
    if (sortDirection === 'aes') {
        sortDirection = 'des'; // Nếu đang là 'aes', chuyển sang 'des'
    } else {
        sortDirection = 'aes'; // Ngược lại, chuyển sang 'aes'
    }
    sortFruitList(sortDirection); // Gọi hàm sắp xếp với hướng mới
}
