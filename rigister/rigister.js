const form = document.getElementsByTagName("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cfPassword = document.getElementById("cfPassword");

//B1: Show Password
const showPassword = document.getElementById("show-password");
const showCfPassword = document.getElementById("show-cfPassword");


//khởi tạo từ form -> cfpass
let formRigister = document.getElementById("formRigister");
// console.log(formRigister.name);

//

// console.log(formRigister.name);
// // tạo function onsubmit
function submitForm(event) {

  //ngăn load trang
  event.preventDefault();
  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  //status thể hiện tài khoản có bị admin khóa hay ko
  let status = true;
  //role thể hiện cấp độ của user (có 2 cấp: admin và user)
  let role = "user";
  let id = 1;
  if (userList.length > 0) {
    id = userList[userList.length - 1].id + 1;
  }

  //tạo ra 1 biến để lưu dữ liệu user
  let newUser = {
    id,
    name: formRigister.name.value,
    email: formRigister.email.value,
    password: formRigister.password.value,
    status: status,
    role: role,
  };


  let checkEmplty = checkEmptyError([username, email, password, cfPassword]);
  let checkEmail = checkEmailError(email);
  let checkLengthUser = checkLengthError(username, "username", 6, 20);
  let checkLengthPass = checkLengthError(password, "password", 8, 20);
  let checkcfPass = checkCfPassword(password, cfPassword);
  if (
    !checkEmplty &&
    !checkEmail &&
    !checkLengthUser &&
    !checkLengthPass &&
    !checkcfPass
  ) {
    let index = userList.findIndex(
      (el) => el.email === formRigister.email.value
    );
    if (index !== -1) {
      Swal.fire({
        title: "Error!",
        text: "Email bạn đăng kí đã tồn tại !!!",
        icon: "error",
        confirmButtonText: "Cancel",
      });
      return;
    }
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đăng ký thành công",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => (window.location.href = "http://127.0.0.1:5502/login/login.html"));
  } else {
    Swal.fire({
      title: "Error!",
      text: "Đăng ký thất bại !!!",
      icon: "error",
      confirmButtonText: "Cancel",
    });
  }

  
}


//B2:show password: add sự kiện sau khi click vào thì ẩn hiện con mắt
showPassword.addEventListener("click", () => {
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

showCfPassword.addEventListener("click", () => {
  if (showCfPassword.classList.contains("fa-eye")) {
    showCfPassword.classList.remove("fa-eye");
    showCfPassword.classList.add("fa-eye-slash");
    cfPassword.setAttribute("type", "text");
  } else {
    showCfPassword.classList.remove("fa-eye-slash");
    showCfPassword.classList.add("fa-eye");
    cfPassword.setAttribute("type", "password");
  }
});
//----------------------------------^

// Thông báo khi thành công
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.getElementsByTagName("small");
  parent.classList.remove("error");
  small.textContent = "";
}


// Thông báo khi lỗi
function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.getElementsByTagName("small");
  parent.classList.add("error");
  small.textContent = message;
}


// Check rỗng
function checkEmptyError(listInput) {
  let checkEmpty = false;

  for (let i = 0; i < listInput.length; i++) {
    let input = listInput[i];
    input.value = input.value.trim(); // không được để khoảng trống
    if (!input.value) {
      checkEmpty = true;
      showError(input, "Không được để trống");
    
    } else {
      showSuccess(input);
    }
  }

  return checkEmpty;
}


// Check Email
function checkEmailError(input) {
  let regexEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  input.value = input.value.trim();
  let checkEmail = regexEmail.test(input.value);
  if (checkEmail) {
    showSuccess(input);
    return false;
  } else if (input.value == "") {
    showError(input, "Không được để trống");
    return true;
  } else {
    showError(input, "Email sai định dạng");
    return true;
  }
}

// Check độ dài username và password
function checkLengthError(input, name, min, max) {
  input.value = input.value.trim();

  if (input.value.length == 0) {
    showError(input, "Không được để trống");
    return true;
  } else if (input.value.length < min) {
    showError(input, `${name} không được nhỏ hơn ${min} ký tự`);
    return true;
  } else if (input.value.length > max) {
    showError(input, `${name} không được lớn hơn ${max} ký tự`);
    return true;
  } else {
    showSuccess(input);
    return false;
  }
}

// check confirm Password
function checkCfPassword(password, cfPassword) {
  if (cfPassword.value == "") {
    showError(cfPassword, "Không được để trống");
  } else if (password.value !== cfPassword.value) {
    showError(cfPassword, "Mật khẩu không trùng khớp");
    return true;
  } else {
    showSuccess(cfPassword);
    return false;
  }
}




