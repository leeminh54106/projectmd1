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

