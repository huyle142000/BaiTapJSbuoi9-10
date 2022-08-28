// EYES ICON Passwords
function passwordss() {
    var passwordIcons = document.getElementById("password");
    var resultsCheck = checkPasswords()
    if (resultsCheck === undefined) {
        passwordIcons.setAttribute('type', 'text')
        passwordIcons.parentElement.classList.add('show-password')
    } else {
        passwordIcons.setAttribute('type', 'password')
        passwordIcons.parentElement.classList.remove('show-password')
    }
}
var eyeShow = document.querySelector('.fa-eye-slash');
eyeShow.onclick = passwordss

function checkPasswords() {
    var passwordIcons = document.getElementById("password");
    var checkPasswords = passwordIcons.getAttribute("type")
    return checkPasswords === 'password' ? undefined : 'text'

}
//
function resetForm() {
    form1.reset();
}

var listStaff = new ListStaffs();


// Hàm in ra bảng
var tableDanhSach = document.getElementById("tableDanhSach");

function printTable(listStaff) {

    var tableDanhSach = document.getElementById("tableDanhSach");
    tableDanhSach.innerHTML = "";
    for (var i = 0; i < listStaff.length; i++) {
        var staffsone = listStaff[i];
        createRow(tableDanhSach, staffsone)
    }
    setLocalstorages()
}

function createRow(tableDanhSach, staff) {
    var tr = document.createElement("tr");
    tr.setAttribute("id", staff.account)
    for (var i = 0; i < staff.arrayStaff.length; i++) {
        var td = document.createElement("td");
        td.innerHTML = staff.arrayStaff[i]
        tr.appendChild(td);
    }
    //Ta cần tạo lại thêm 1 td nữa và để nó lưu các nút 
    var btnView = '<button class="btn btn-primary" data-target="#myModal" data-toggle="modal" id="view_' + staff.account + '">Xem</button>';
    var btnDelete = '<button class="btn btn-danger" id="delete_' + staff.account + '">Xóa</button>';
    //Tạo ở đây:
    var td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = btnView + btnDelete
    tableDanhSach.appendChild(tr);
    deleteEmployee('delete_' + staff.account)
    btnViews('view_' + staff.account)

}




function setLocalstorages() {
    localStorage.setItem('DSNV', JSON.stringify(listStaff.listStaffs))
}
function getLocalstorages() {
    if (localStorage.getItem("DSNV") != undefined) {
        listStaff.listStaffs = JSON.parse(localStorage.getItem("DSNV"))
    }
    printTable(listStaff.listStaffs)

}
getLocalstorages()


//Xóa

function deleteEmployee(eleId) {
    document.getElementById(eleId).addEventListener("click", function (e) {

        var arrayTemp = eleId.split('_');
        listStaff.deleteStaff(arrayTemp[1]);
        printTable(listStaff.listStaffs)
    })
}

function deleteStaffs(arrayTemp) {
    var index1 = -1;
    for (var i = 0; i < listStaff.listStaffs.length; i++) {

        if (listStaff.listStaffs[i].account === arrayTemp) {
            index1 = i;
            break;
        }

    }
    listStaff.listStaffs.splice(index1, 1);

}

//Xem
function btnViews(eleId) {

    var btnViews = document.getElementById(eleId)
    btnViews.addEventListener('click', function () {

        var temp = eleId.split('_');

        var staffFound = listStaff.listStaffs[listStaff.foundStaff(temp[1])];
        document.getElementById("tknv").value = staffFound.account;
        document.getElementById("tknv").disabled = true;

        document.getElementById("name").value = staffFound.name;
        document.getElementById("email").value = staffFound.email;
        document.getElementById("password").value = staffFound.password;
        document.getElementById("datepicker").value = staffFound.workDay;
        document.getElementById("luongCB").value = staffFound.basicSalary;
        document.getElementById("chucvu").value = staffFound.position;
        document.getElementById("gioLam").value = staffFound.hourOfMonth;
        document.getElementById("btnThemNV").style.display = "none";

        document.querySelectorAll('.sp-thongbao').innerHTML = " ";
        document.getElementById("btnCapNhat").style.display = "block";

    })

}


//Thêm
var btnThem = document.getElementById('btnThem');
btnThem.addEventListener('click', function (e) {
    document.getElementById("tknv").disabled = false;
    document.getElementById("form1").reset()
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("btnThemNV").style.display = "block";

})


//search data: Tìm đối tượng dựa vào dữ liệu nhập
var btnTimNV = document.getElementById('btnTimNV');
btnTimNV.addEventListener('click', function (e) {
    var dataSearch = document.getElementById('searchName').value;
    var listStaffFound = listStaff.filterStaff(dataSearch)
    printTable(listStaffFound)
})

// var dataSearch = document.getElementById('searchName');
// dataSearch.onkeyup = function (e) {
//     var dataSearch = document.getElementById('searchName').value;
//     var listStaffFound = listStaff.filterStaff(dataSearch)
//     printTable(listStaffFound)
// }




//Kiểm tra Form
function Validator(options) {

    var formElement = document.getElementById(options.form);
    var listRule = {}
    if (formElement) {
        //Thêm nhân viên
        //Thêm nhân viên
        var btnThemNV = document.getElementById("btnThemNV");
        btnThemNV.onclick = function (e) {
            var result = true;
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                result &= Vadidate(inputElement, rule);

            }
            )
            if (result) {
                var account = document.getElementById("tknv").value;
                var nameStaff = document.getElementById("name").value;
                var email = document.getElementById("email").value;
                var password = document.getElementById("password").value;
                var datepicker = document.getElementById("datepicker").value;
                var luongCB = Number(document.getElementById("luongCB").value);
                var chucvu = document.getElementById("chucvu").value;
                var gioLam = document.getElementById("gioLam").value;
                btnThemNV.setAttribute('data-dismiss', "modal");
                var staff = new Staffs(account, nameStaff, email, password, datepicker, luongCB, chucvu, gioLam);

                listStaff.addStaff(staff);
                printTable(listStaff.listStaffs)
                resetForm()
            } else {
                btnThemNV.removeAttribute('data-dismiss');

                alert("Hãy điền đủ form")
            }

        }


        //Update BTN :

        var btnCapNhat = document.getElementById('btnCapNhat')
        btnCapNhat.addEventListener('click', function (e) {
            var result = true;
            
            for (var i = 3; i < options.rules.length; i++) {
                var inputElement = formElement.querySelector(options.rules[i].selector);

                result &= Vadidate(inputElement, options.rules[i]);

            }

            if (result) {
                var account = document.getElementById("tknv").value;
                var nameStaff = document.getElementById("name").value;
                var email = document.getElementById("email").value;
                var password = document.getElementById("password").value;
                var datepicker = document.getElementById("datepicker").value;
                var luongCB = Number(document.getElementById("luongCB").value);
                var chucvu = document.getElementById("chucvu").value;
                var gioLam = document.getElementById("gioLam").value;

                var staff = new Staffs(account, nameStaff, email, password, datepicker, luongCB, chucvu, gioLam);
                listStaff.update(staff)
                printTable(listStaff.listStaffs)
                resetForm()

            } else {
                alert("Hãy điền đủ form")
            }

        })


        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            //  
            if (Array.isArray(listRule[rule.selector])) {
                listRule[rule.selector].push(rule.test)
            } else {

                listRule[rule.selector] = [rule.test]
            }

            inputElement.onblur = function () {
                var results = true;
                results &= Vadidate(inputElement, rule);
            };

        })
    }
    function Vadidate(inputElement, rule) {
        var isValid = true;
        var errorElement = inputElement.closest('.form-group').querySelector('.sp-thongbao');
        var errorMessage;
        var rules = listRule[rule.selector];
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            inputElement.closest('.form-group').classList.add('invalid')
            errorElement.innerHTML = errorMessage;
            return isValid = false;
        } else {
            inputElement.closest('.form-group').classList.remove('invalid')
            errorElement.innerHTML = '';
            return isValid
        }
    }

}


Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message
        }
    }
}

Validator.isLength = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= 4 && value.length <= 6 ? undefined : message
        }
    }
}

Validator.isSame = function (selector, message, mangSv) {
    return {
        selector: selector,
        test: function (value) {
            var isExist = false;
            if (mangSv == "") {
                return undefined;
            }
            isExist = mangSv.some(function (sv) {
                
                return value.replaceAll(" ", "") == sv.account;
            })

            if (isExist) {
                return message;
            } else {
                return undefined;

            }
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message

        }
    }
}

Validator.isName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;
            return regex.test(value.trim()) ? undefined : message

        }
    }
}

Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

            return pattern.test(value) ? undefined : message

        }
    }
}



Validator.isDate = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var pattern = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi;


            return pattern.test(value) ? undefined : message

        }
    }
}

Validator.isBasicSalary = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[0-9]+$/;
            if (regex.test(value)) {
                if (value >= 1000000 && value <= 20000000) {

                    return undefined;
                } else {
                    return message;
                }
            } else {
                return message;
            }

        }
    }
}
Validator.isOptions = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value != 0 ? undefined : message

        }
    }
}
Validator.isWorkHour = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[0-9]+$/;
            if (regex.test(value)) {
                if (value >= 80 && value <= 200) {

                    return undefined;
                } else {
                    return message;
                }
            } else {
                return message;
            }

        }
    }
}
