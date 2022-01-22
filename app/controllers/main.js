var ps = new PersonServices();

var validation = new Validation();
//Kiểm tra thông tin
function checkValidation(ten, pass, mail, hinh, moTa) {
    var isValid = true;
    //Họ tên: không được để trống, không chứa số và ký tự đặc biệt 
    isValid &= validation.checkEmpty(ten, "tbTen", "Hãy nhập tên của bạn") && validation.checkName(ten, "tbTen", "Tên không chứa số và ký tự đặc biệt");
    //Mật khẩu: không được để trống, dúng format (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tựsố, độ dài 6-8)
    isValid &= validation.checkEmpty(pass, "tbPass", "Hãy nhập mật khẩu của bạn") && validation.checkPass(pass, "tbPass", "Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8");
    //Email: không được để trống, đúng format email
    isValid &= validation.checkEmpty(mail, "tbMail", "Hãy nhập email của bạn") && validation.checkMail(mail, "tbMail", "Hãy nhập đúng định dạng email");
    //Hinh anh: không được để trống
    isValid &= validation.checkEmpty(hinh, "tbHinh", "Hãy nhập hình ảnh của bạn");
    //Loại người dùng: phải chọn loại
    isValid &= validation.checkSelect("loaiNguoiDung", "tbLoai", "Bạn chưa chọn loại người dùng");
    //Loại ngôn ngữ: phải chọn loại
    isValid &= validation.checkSelect("loaiNgonNgu", "tbNN", "Bạn chưa chọn ngôn ngữ");
    //Mô tả: không được để trống, không vượt quá 60 ký tự
    isValid &= validation.checkEmpty(moTa, "tbMota", "Hãy nhập mô tả của bạn") && validation.checkMota(moTa, "tbMota", "Bạn đã nhập quá 60 ký tự");
    return isValid;
}

//Lấy dữ liệu
function getPerSons() {
    ps.getPerson()
        .then(function (result) {
            showTable(result.data)
        })
        .catch(function (err) {
            console.log(err);
        })
}
getPerSons();


//Hiển thị lên table
function showTable(data) {
    var number = 1;
    var content = "";
    data.map(function (person) {
        content += `
        <tr>
        <td>${number}</td>
        <td>${person.taiKhoan}</td>
        <td>${person.matKhau}</td>
        <td>${person.hoTen}</td>
        <td>${person.email}</td>
        <td>${person.ngonNgu}</td>
        <td>${person.loaiND}</td>
        <td>
            <button onclick="deletePersons(${person.id})" class="btn btn-danger">Xóa</button>
            <button onclick="showPersons(${person.id})" class="btn btn-info">Xem</button>
        </td>
        </tr>
        `;
        number++;
    });
    document.querySelector("#tblDanhSachNguoiDung").innerHTML = content;
}
//Tạo button add
document.querySelector("#btnThemNguoiDung").addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `<button onclick="addPersons()" class="btn btn-success">Add</button>`;
});

// Thêm Person

function addPersons() {
    // tKhoan, ten, pass, mail, loai, ngonNgu, moTa, hinh
    var tKhoan = document.querySelector("#TaiKhoan").value;
    var ten = document.querySelector("#HoTen").value;
    var pass = document.querySelector("#MatKhau").value;
    var mail = document.querySelector("#Email").value;
    var loai = document.querySelector("#loaiNguoiDung").value;
    var ngonNgu = document.querySelector("#loaiNgonNgu").value;
    var moTa = document.querySelector("#MoTa").value;
    var hinh = document.querySelector("#HinhAnh").value;

    var isValid = true;

    isValid &= validation.checkEmpty(tKhoan, "tbTK", "Hãy nhập tên tài khoản ?") && ps.getPerson()
        .then(function (result) {
            console.log(result.data);
        }).catch(function (err) {
            console.log(err);
        });
    isValid = checkValidation(ten, pass, mail, hinh, moTa);
    if (isValid) {
        var person = new PerSon(tKhoan, ten, pass, mail, loai, ngonNgu, moTa, hinh);
        ps.addPerson(person)
            .then(function () {
                getPerSons();
                document.querySelector(".modal-header .close").click();
            }).catch(function (err) {
                console.log(err);
            });

    }

}

function deletePersons(id) {
    ps.deletePerson(id)
        .then(() => {
            getPerSons()
        }).catch((err) => {
            console.log(err);
        });
}
// xem Person
function showPersons(id) {
    ps.showPerson(id)
        .then(function (result) {
            document.querySelector("#TaiKhoan").value = result.data.taiKhoan;
            document.querySelector("#TaiKhoan").disabled = true;
            document.querySelector("#HoTen").value = result.data.hoTen;
            document.querySelector("#MatKhau").value = result.data.matKhau;
            document.querySelector("#Email").value = result.data.email;
            document.querySelector("#loaiNguoiDung").value = result.data.loaiND;
            document.querySelector("#loaiNgonNgu").value = result.data.ngonNgu;
            document.querySelector("#MoTa").value = result.data.moTa;
            document.querySelector("#HinhAnh").value = result.data.hinhAnh;

            document.querySelector("#btnThemNguoiDung").click();
            //Tạo button update
            document.querySelector(".modal-footer").innerHTML = `<button onclick="updatePersons(${id})" class="btn btn-success">Update</button>`;

        }).catch(function (err) {
            console.log(err);
        });
}
// cap nhap person
function updatePersons(id) {
    var tKhoan = document.querySelector("#TaiKhoan").value;
    var ten = document.querySelector("#HoTen").value;
    var pass = document.querySelector("#MatKhau").value;
    var mail = document.querySelector("#Email").value;
    var loai = document.querySelector("#loaiNguoiDung").value;
    var ngonNgu = document.querySelector("#loaiNgonNgu").value;
    var moTa = document.querySelector("#MoTa").value;
    var hinh = document.querySelector("#HinhAnh").value;

    var isValid = true;
    isValid = checkValidation(ten, pass, mail, hinh, moTa);
    if (isValid) {
        var person = new PerSon(tKhoan, ten, pass, mail, loai, ngonNgu, moTa, hinh);
        ps.updatePerson(id, person)
            .then(function (result) {
                console.log(result.data);
                getPerSons();
                document.querySelector(".modal-header .close").click();

            }).catch(function (err) {
                console.log(err);
            });
    }
}

//Reset form
function resetForm() {
    document.querySelector(".modal-body").reset();
    document.querySelector("#TaiKhoan").disabled = false;
}


document.querySelector(".close").addEventListener("click", resetForm)
document.querySelector("#myModal").addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        resetForm();
    }
});