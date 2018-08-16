//Buttons

const searchInput = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
var blockToAddForm = document.querySelector('.blockAdd');
var blockToEit = document.querySelector('.showinfo');
var openBtn = document.getElementById('openBtn');
var cancelBtn = document.getElementById('cancelBtn');
var addBtn = document.getElementById('addBtn');
var backBtn = document.getElementById('backBtn');
var editBtn = document.getElementById('editBtn');
var editContact = document.querySelector('#contact-list');
//Form Fields

var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var phone = document.getElementById('phone');
var email = document.getElementById('email');


//Addres Book Display

var contactsBlock = document.querySelector('#contact-list');


// Create Storage

var addressBook = [];

openBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "block";

});

cancelBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "none";
    clearForm();
});

backBtn.addEventListener('click', function () {
    blockToEit.style.display = "none";
    clearForm();
});

editContact.addEventListener('click', function () {
    blockToEit.style.display = "block";
    console.log(this);
});

clearBtn.addEventListener('click', function() {
    searchInput.value = '';
});

searchInput.addEventListener('keyup', filterContacts);

addBtn.addEventListener('click', addToBook);
contactsBlock.addEventListener('click', removeEntry);

function Contact(firstName,lastName,phone,email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.id = new Date().getTime();
}

// обязательно вводить все данные
// function addToBook() {
//     var _firstName = firstName.value;
//     var _lastName = lastName.value;
//     var _phone = phone.value;
//     var _email = email.value;
//     var isNull = _firstName !== '' && _lastName !== '' && _phone !== '' && _email !== '';
//     if (isNull) {
//         var newContact = new Contact(_firstName, _lastName, _phone, _email);
//         setContactsFromStore(newContact);
//         blockToAddForm.style.display = 'none';
//         clearForm();
//         showAddressBook();
//     }
// }

// обязательно вводить имя и телефон
function addToBook() {
    var _firstName = firstName.value;
    var _lastName = lastName.value;
    var _phone = phone.value;
    var _email = email.value;
    var isNull = _firstName !== '' && _phone !== '';
    if (isNull) {
        var newContact = new Contact(_firstName, _lastName, _phone, _email);
        setContactsFromStore(newContact);
        blockToAddForm.style.display = 'none';
        clearForm();
        showAddressBook();
    }
}

function removeEntry(e) {
    if(e.target.classList.contains("delbutton")){
        var remID = e.target.getAttribute("data-id");
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
    const contacts = getContactsFromStore();
    contactsBlock.innerHTML = contacts.map(getContactHTML).join('');
}

function getContactsFromStore() {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
}

function setContactsFromStore(contact) {
    const contacts = getContactsFromStore();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function getContactHTML(contact) {
    return '<li class="contact__item" data-id="' + contact.id + '">' + contact.lastName + ' ' + contact.firstName + '</li>';
}

function filterContacts() {
    var filter, li;
    filter = searchInput.value.toUpperCase();
    li = contactsBlock.getElementsByTagName('li');

    Array.from(li).forEach(function(item) {
        if (item.innerHTML.toUpperCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}



showAddressBook();

