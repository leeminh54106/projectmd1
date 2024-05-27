
  
let countCart2 = document.getElementById('countCart');
function countCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let count = 0;
    for(let i = 0; i < cart.length; i++){
        count ++
    }
    countCart2.innerHTML = count;
}
countCart()