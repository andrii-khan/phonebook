//Buttons

const searchInput = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
var blockToAddForm = document.querySelector('.blockAdd');
var openBtn = document.getElementById('openBtn');
var cancelBtn = document.getElementById('cancelBtn');
var addBtn = document.getElementById('addBtn');

//Form Fields

var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var phone = document.getElementById('phone');
var email = document.getElementById('email')


//Addres Book Display

var addBookDiv = document.querySelector(".addbook");


// Create Storage

var addressBook = [];

openBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "block";
});

cancelBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "none";
    clearForm();
});

clearBtn.addEventListener('click', function() {
    searchInput.value = '';
});

addBtn.addEventListener('click', addToBook);
addBookDiv.addEventListener('click', removeEntry);

function jsonStructure(fistName,lastName,phone,email) {
    this.fistName = fistName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;

}

function addToBook() {
    var isNull = firstName.value!='' && lastName.value!='' && phone.value!='' && email.value!='';
    if (isNull) {
        // Add to the form
        // var obj = {"firstName":"Khan", "lastName":"Andrey","phone":"099-958-24-84","email":"iquach@icloud.com"};
        var obj = new jsonStructure(firstName.value,lastName.value,phone.value,email.value);
        addressBook.push(obj);
        localStorage['addbook'] = JSON.stringify(addressBook);
        //Hide the form panel
        blockToAddForm.style.display = "none";
        //Clear the form
        clearForm();
        showAddressBook();
    }
}

    function removeEntry(e) {
        if(e.target.classList.contains("delbutton")){
            var remID = e.target.getAttribute("dara-id");
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm() {
        var frm = document.querySelectorAll(".formFields");
        for(var i in frm){
            frm[i].value = '';
        }
    }

    function showAddressBook() {
        if (localStorage['addbook'] === '') {
            localStorage['addbook'] = "[]";
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBookDiv.innerHTML = '';
            for (var n in addressBook) {
                var str = '<div class="entry">'
                str += '<div class="name"><p>' + addressBook[n].firstName + ' ' + addressBook[n].lastName + '</p></div>';
                str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
                str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
                str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }
    showAddressBook();

