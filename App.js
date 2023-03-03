// new add
var registeForm = document.querySelector("#registe-Form");
var allInput = registeForm.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btnss");
var modal = document.querySelector(".modal");
addBtn.onclick = function () {
    modal.classList.add("active");
}
// colse
var closeTab = document.querySelector("#close-tab");
// closeTab.onclick = function () {
//     modal.classList.remove("active")
// }
closeTab.addEventListener("click", () => {
    modal.classList.remove("active")
    var i;
    for (i = 0; i < allInput.length; i++){
        allInput[i].value = "";
    }
})
// handle user data global
var userdata = [];
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field")
var id = document.getElementById("id");
var nam = document.querySelector("#name");
var l_name = document.getElementById("last-name");
var email = document.getElementById("email");
var office = document.getElementById("office-code");
var jobtitle = document.getElementById("j-title");
var registerBtn = document.querySelector(".bt1");
var updateBtn = document.querySelector("#update-btn");
var imgUrl;
var registerBtn = document.querySelector(".bt1");
//


// register

registerBtn.onclick = function(e) {
    e.preventDefault();
    regitrationData();
    getDataFormLocal();
    registeForm.reset(' ')
    closeTab.click();
}

if (localStorage.getItem("userdata") != null) {
    userdata = JSON.parse(localStorage.getItem("userdata"));
}
console.log(userdata)

function regitrationData() {
    userdata.push({
        id: id.value,
        name: nam.value,
        l_name: l_name.value,
        email: email.value,
        office: office.value,
        jobtitle: jobtitle.value,
        profilePic: imgUrl == undefined ? "img/img.png" : imgUrl
    });
    var userString = JSON.stringify(userdata)
    localStorage.setItem("userdata", userString);
    swal("Good job!", "Registration success", "success");

}
// start  returning data on page
var tableData = document.querySelector("#table-data");
// var data;
const getDataFormLocal = () => {
    tableData.innerHTML = ""
    // console.log("first")
    userdata.forEach((data, index) => {
        tableData.innerHTML += `
        
            <tr index='${index}'>
                <td>${index+1}</td>
                <td><img src="${data.profilePic}" width="50px" height="50px"></td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.email}</td>
                <td>${data.office}</td>
                <td>${data.jobtitle}</td>
                <td>
                    <button class="edit-btn"><i class="fa fa-eye" style="color: rgb(166, 255, 0);"></i></button>
                    <button class="del-btn"><i class="fa fa-trash" style="color: red;"></i></button>
                </td> 
            </tr>

        `;
    });
    //start deleate btn
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn")
    for (i = 0; i < allDelBtn.length; i++){
        allDelBtn[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            // 
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        // deleta ofr ok cancle button
                        userdata.splice(id, 1)
                        localStorage.setItem("userdata", JSON.stringify(userdata))
                        tr.remove();
                        //
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
            // 
           
        }
    }
    //start update
    var allEdit = document.querySelectorAll(".edit-btn");
    // console.log(allEdit);
    for (i = 0; i < allEdit.length; i++){
        allEdit[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("IMG");
            var profile_Pic2 = imgTag[0].src;
            var id2 = td[2].innerHTML;
            var name2 = td[3].innerHTML;
            var l_name2 = td[4].innerHTML;
            var email2 = td[5].innerHTML;
            var officeCode2 = td[6].innerHTML;
            var jobtitle2 = td[7].innerHTML;
            addBtn.click();
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            id.value = id2;
            name.value = name2;
            email.value = email2;
            l_name.value = l_name2;
            office.value = officeCode2;
            jobtitle.value = jobtitle2;
            profile_pic.src = profile_Pic2;
            updateBtn.onclick = function (e) {
                userdata[index] = {
                    id: id.value,
                    name: nam.value,
                    l_name: l_name.value,
                    email: email.value,
                    office: office.value,
                    jobtitle: jobtitle.value,
                    profilePic: uploadPic.value == "" ? profile_pic.src : imgUrl
                }
                localStorage.setItem("userdata", JSON.stringify(userdata));
            //     e.preventDefault();
            }
        }
    }
}
getDataFormLocal();

//get img

uploadPic.onchange = function () {
    if (uploadPic.files[0].size < 10000000) {
        var fReader = new FileReader();
        fReader.onload = function (e) {
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
        }
        fReader.readAsDataURL(uploadPic.files[0]);
    } else {
        alert("file size is to Long");
    }
    confirm("Plese confirm")
}

// start search codeing

var searchEl = document.querySelector("#emId");
searchEl.oninput = function () {
    searchFuc();
}
function searchFuc() {
    var tr = tableData.querySelectorAll("TR");
    var filter = searchEl.value.toLowerCase();
    var i;
    for (i = 0; i < tr.length; i++){
        var id = tr[i].getElementsByTagName("TD")[2].innerHTML;
        var name = tr[i].getElementsByTagName("TD")[3].innerHTML;
        var l_name = tr[i].getElementsByTagName("TD")[4].innerHTML;
        var email = tr[i].getElementsByTagName("TD")[5].innerHTML;
        var office = tr[i].getElementsByTagName("TD")[6].innerHTML;
        var jobtitle = tr[i].getElementsByTagName("TD")[7].innerHTML;
        if (id.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else if (name.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        }
        else if (l_name.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        }
        else if (email.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        }
        else if (office.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        }
        else if (jobtitle.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }
}

// start clear all data
var delAllBtn = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click', () => {
    if(allDelBox.checked == true){
        // swal("🗑️", "All Data Delete  ", "success");
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //
                    localStorage.removeItem("userdata")
                    window.location = location.href;
                    swal("🗑️", "Poof! Your imaginary file has been deleted!",{
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
        
    } else {
        swal(" check but plese checked after delete", "not  delete ", "warning");
    }
     
})