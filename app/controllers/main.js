document.querySelector(".modal-title").innerHTML = "Thêm Người Dùng";

let account = document.getElementById("TaiKhoan");
let Name = document.getElementById("HoTen");
let password = document.getElementById("MatKhau");
let email = document.getElementById("Email");
let image = document.getElementById("HinhAnh");
let typeUser = document.getElementById("loaiNguoiDung");
let language = document.getElementById("loaiNgonNgu");
let description = document.getElementById("MoTa");
//===========================================================
getUsers();

function getUsers() {
  apiGetUsers()
    .then((response) => {
      // console.log(response.data);
      let users = response.data.map((user) => {
        return (user = new Users(
          user.id,
          user.account,
          user.name,
          user.password,
          user.email,
          user.image,
          user.typeUser,
          user.language,
          user.description
        ));
      });
      display(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUsers(userId, user) {
  apiUpdateUsers(userId, user)
    .then((response) => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}

function addUsers(user) {
  apiAddUsers(user)
    .then((response) => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteUsers(id) {
  apiDeleteUsers(id)
    .then((response) => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}

function resetInput() {
  account.value = "";
  Name.value = "";
  password.value = "";
  email.value = "";
  image.value = "";
  typeUser.value = "";
  language.value = "";
  description.value = "";
}

function display(users) {
  let content = "";
  users.reduce((result, users) => {
    return (content =
      result +
      `
        <tr>
            <td>${users.id}</td>
            <td>${users.account}</td>
            <td>${users.password}</td>
            <td>
                <img src="${users.image}" alt="" width="150px" height="auto">
            </td>
            <td>${users.name}</td>
            <td>${users.email}</td>
            <td>${users.language}</td>
            <td>${users.typeUser}</td>
            <td>
                <button 
                class = "btn btn-primary"
                data-toggle = "modal"
                data-target =" #myModal"
                data-id = "${users.id}"
                data-type = "edit"
                >Edit</button>
                <button 
                class = "btn btn-danger"
                data-id = "${users.id}"
                data-type = "delete"
                >Delete</button>
            </td>
        </tr>`);
  }, "");
  document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

document.getElementById("btnThemNguoiDung").addEventListener("click", () => {
  document.querySelector(".modal-title").innerHTML = "Thêm Người Dùng";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class="btn btn-primary" data-type = "add">Thêm</button>
    <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>`;
});

document.querySelector(".modal-footer").addEventListener("click", (e) => {
    // DOM tới các input lấy giá trị
    let id = e.target.getAttribute("data-id");
    let user = new Users(
        id,
        account.value,
        Name.value,
        password.value,
        email.value,
        image.value,
        typeUser.value,
        language.value,
        description.value
    );
    // lấy dữ liệu attribute từ target đã kích hoạt event
    let elementType = e.target.getAttribute("data-type");
    // kiểm tra nút nhấn update
    if (elementType === "update") {
        if (
            validateAccount(account.value) == true &&
            validateName(Name.value) == true &&
            validatePassword(password.value) == true &&
            validateEmail(email.value) == true &&
            validateImage(image.value) == true &&
            validateTyperUser(typeUser.value) == true &&
            validateLanguage(language.value) == true &&
            validateDescription(description.value) == true
            ) {
            updateUsers(id, user);
            alert("Cập nhật thông tin người dùng thành công");
            resetInput();
        } else {
            alert("Cập nhật thông tin người dùng không thành công");
        }
    } else if (elementType === "add") {
        if (
            validateAccount(account.value) == true &&
            validateName(Name.value) == true &&
            validatePassword(password.value) == true &&
            validateEmail(email.value) == true &&
            validateImage(image.value) == true &&
            validateTyperUser(typeUser.value) == true &&
            validateLanguage(language.value) == true &&
            validateDescription(description.value) == true
            ) {
                console.log(account.value)
            addUsers(user);
            alert("Thêm người dùng thành công");
            resetInput();
        } else {
            alert("Thêm người dùng không thành công");
        }
    }
});

document.getElementById("tblDanhSachNguoiDung").addEventListener("click", (e) => {
    // lấy dữ liệu attribute từ target đã kích hoạt event
    let elementType = e.target.getAttribute("data-type");
    let id = e.target.getAttribute("data-id");
    // kiểm tra nút nhấn edit
    if (elementType === "edit") {
      // chỉnh sửa nút Update trên giao diện
      document.querySelector(".modal-title").innerHTML =
        "Cập Nhật Thông Tin Người Dùng";
      document.querySelector(
        ".modal-footer"
      ).innerHTML = `<button class="btn btn-primary" data-id="${id}" data-type="update">Cập nhật</button>
        <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>`;
      // lấy thông tin object cần edit từ server = id
      apiGetUsersID(id)
        .then((response) => {
          // fill thông tin lấy đc từ server vào giao diện Edit
          account.value = response.data.account;
          Name.value = response.data.name;
          password.value = response.data.password;
          email.value = response.data.email;
          image.value = response.data.image;
          typeUser.value = response.data.typeUser;
          language.value = response.data.language;
          description.value = response.data.description;
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (elementType === "delete") {
      deleteUsers(id);
      alert("Người dùng đã bị xóa");
    }
});



// ========================== VALIDATION ===========================

let error = document.querySelectorAll(".showError");
let inputGroup = document.querySelectorAll(".form-group");
let users = [];
apiGetUsers()
    .then(response => {
      // console.log(response.data)
      users = response.data;
    })
    .catch(error => {
      console.log(error)
    })
console.log(users)     
// validate giá trị Account
function validateAccount(value) {
  let stamp = users.findIndex((user) => {
      console.log(users)
      return user.account === value;
    })
    if (stamp != -1) {
        inputGroup[0].classList.add("mb-0");
        error[0].innerHTML = "Tài khoản đã tồn tại";
        return false;    
    } else if (value == "") {
        inputGroup[0].classList.add("mb-0");
        error[0].innerHTML = "Tài khoản không được bỏ trống";
        return false;
    }  else {
        inputGroup[0].classList.add("mb-0");  
        error[0].innerHTML = "";
        return true;
    }
}
// Kiểm tra dữ liệu Account
account.onblur = () => {
  if (validateAccount(account.value)) {
    account.style.border = "1px solid blue";
  } else {
    account.style.border = "1px solid red";
  }
};
// validate giá trị Name
function validateName(value) {
  let validate = /([A-Za-z])\w+/;
  if (validate.test(value)) {
    error[1].innerHTML = "";
    return true;
  }
  if (value == "") {
    inputGroup[1].classList.add("mb-0");
    error[1].innerHTML = "Họ tên không được bỏ trống";
    return false;
  } else {
    inputGroup[1].classList.add("mb-0");
    error[1].innerHTML = "Tên nhân viên phải là chữ";
    return false;
  }
}
// Kiểm tra dữ liệu Name
Name.onblur = () => {
  if (validateName(Name.value)) {
    Name.style.border = "1px solid blue";
  } else {
    Name.style.border = "1px solid red";
  }
};
// validate giá trị Password
function validatePassword(value) {
  let validate =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;
  if (validate.test(value)) {
    error[2].innerHTML = "";
    return true;
  } else if (value === "") {
    inputGroup[2].classList.add("mb-0");
    error[2].innerHTML = "Mật khẩu không được bỏ trống";
    return false;
  } else {
    inputGroup[2].classList.add("mb-0");
    error[2].innerHTML =
      "Mật Khẩu từ 6-8 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  }
}
// Kiểm tra dữ liệu Password
password.onblur = () => {
  if (validatePassword(password.value)) {
    password.style.border = "1px solid blue";
  } else {
    password.style.border = "1px solid red";
  }
};
// validate giá trị Email
function validateEmail(value) {
  let validate =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (validate.test(value)) {
    error[3].innerHTML = "";
    return true;
  } else if (value === "") {
    inputGroup[3].classList.add("mb-0");
    error[3].innerHTML = "Email không được bỏ trống";
    return false;
  } else {
    inputGroup[3].classList.add("mb-0");
    error[3].innerHTML = " Email không đúng định dạng";
    return false;
  }
}
// Kiểm tra dữ liệu Email
email.onblur = () => {
  if (validateEmail(email.value)) {
    email.style.border = "1px solid blue";
  } else {
    email.style.border = "1px solid red";
  }
};
// validate giá trị Image
function validateImage(value) {
  if (value == "") {
    inputGroup[4].classList.add("mb-0");
    error[4].innerHTML = "Đường dẫn hình ảnh không được bỏ trống";
    return false;
  } else {
    error[4].innerHTML = "";
    return true;
  }
}
// Kiểm tra dữ liệu Image
image.onblur = () => {
  if (validateImage(image.value)) {
    image.style.border = "1px solid blue";
  } else {
    image.style.border = "1px solid red";
  }
};
// validate giá trị typeUser
function validateTyperUser(value) {
  if (value === "GV" || value === "HV") {
    error[5].innerHTML = "";
    return true;
  } else {
    inputGroup[5].classList.add("mb-0");
    error[5].innerHTML = "Loại người dùng không được bỏ trống";
    return false;
  }
}
// Kiểm tra dữ liệu typeUser
typeUser.onblur = () => {
  if (validateTyperUser(typeUser.value)) {
    typeUser.style.border = "1px solid blue";
  } else {
    typeUser.style.border = "1px solid red";
  }
};
// validate giá trị language
function validateLanguage(value) {
  if (
    value === "ITALIAN" ||
    value === "FRENCH" ||
    value === "JAPANESE" ||
    value === "CHINESE" ||
    value === "RUSSIAN" ||
    value === "SWEDEN" ||
    value === "SPANISH"
  ) {
    error[6].innerHTML = "";
    return true;
  } else {
    inputGroup[6].classList.add("mb-0");
    error[6].innerHTML = "Loại ngôn ngữ không được bỏ trống";
    return false;
  }
}
// Kiểm tra dữ liệu language
language.onblur = () => {
  if (validateLanguage(language.value)) {
    language.style.border = "1px solid blue";
  } else {
    language.style.border = "1px solid red";
  }
};
// validate giá trị description
function validateDescription(value) {
  if (value.length > 60) {
    inputGroup[7].classList.add("mb-0");
    error[7].innerHTML = "Mô tả không được vượt quá 60 kí tự";
    return false;
  } else if (value == "") {
    inputGroup[7].classList.add("mb-0");
    error[7].innerHTML = "Mô tả không được bỏ trống";
    return false;
  } else {
    error[7].innerHTML = "";
    return true;
  }
}
// Kiểm tra dữ liệu description
description.onblur = () => {
  if (validateDescription(description.value)) {
    description.style.border = "1px solid blue";
  } else {
    description.style.border = "1px solid red";
  }
};


