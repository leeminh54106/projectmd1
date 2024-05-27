const modal = document.querySelector('#modalContent');
const showPassword = document.querySelector('#show-password');

const email = document.querySelector('#email');
const password = document.querySelector('#password');

let USER_LOCAL = 'userList';
let USER_LOGIN = 'user-login';


showPassword.addEventListener('click', () => {
    if (showPassword.classList.contains("fa-eye")) {
        showPassword.classList.remove("fa-eye");
        showPassword.classList.add("fa-eye-slash");
        password.setAttribute("type", "text");
    } else {
        showPassword.classList.remove("fa-eye-slash");
        showPassword.classList.add("fa-eye");
        password.setAttribute("type", "password");
    }
});


function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add("error");
    small.textContent = message;
};

modal.addEventListener('submit', (e) => {
    e.preventDefault();

    const objUser = {
        email: email.value.trim(),
        password: password.value.trim(),
        status: true,
    };
    const listUser = JSON.parse(localStorage.getItem(USER_LOCAL)) || [];
    const findUser = listUser.find(item =>
        item.email === objUser.email && item.password === objUser.password && item.status === objUser.status
    );


    if (objUser.role == "admin") {
        localStorage.setItem("admin-login", JSON.stringify(findUser));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng nhập thành công",
            text: "Chào mừng bạn đến với Trang quản trị ptpitness",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => (window.location.href = "/admin/user-manenger/user-manenger.html"));
        return;
    }

    if (!findUser) {
        showError(email, "Email hoặc mật khẩu không đúng");
        showError(password, "Email hoặc mật khẩu không đúng");
        Swal.fire({
            title: "Error!",
            text: "Đăng Nhập thất bại !!!",
            icon: "error",
            confirmButtonText: "Cancel",
        });
        return;
    } else {
        localStorage.setItem(USER_LOGIN, JSON.stringify(findUser));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng nhập thành công",
            text: "Chào mừng bạn đến với ptpitness",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => (window.location.href = "http://127.0.0.1:5502/home/home.html"));
    }
});