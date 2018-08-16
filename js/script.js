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
var showContactInfo = document.querySelector('#contact-list');
var deleteYes = document.querySelector('.btnDelete');
var deleteNo = document.querySelector('.btnCancel');
var deleteBtn = document.getElementById('deleteBtn');
var deleteForm = document.getElementById('deleteForm');
//Form Fields

var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var showName = document.querySelector('.firstName');
var showLastName = document.querySelector('.lastName');
var showPhone = document.querySelector('.phone');
var showMail = document.querySelector('.email');
var mailText = document.querySelector('.email__text');


//Addres Book Display

var contactsBlock = document.querySelector('#contact-list');


// Create Storage

var addressBook = [];
var currentUser;

openBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "block";
    deleteBtn.style.display = 'none';
    deleteForm.style.display = 'none';
    if (!currentUser) {
        clearForm();
    }
});

cancelBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "none";
    deleteForm.style.display = 'none';
    if (!currentUser) {
        clearForm();
    }
});

backBtn.addEventListener('click', function () {
    blockToEit.style.display = "none";
    deleteBtn.style.display = 'none';

    clearForm();
});

// editBtn.addEventListener('click', function () {
//     const isShowed = deleteBtn.style.display;
//     if (isShowed === 'none') {
//         deleteBtn.style.display = 'flex';
//     } else {
//         deleteBtn.style.display = 'none';
//     }
// });

editBtn.addEventListener('click', function () {
    blockToAddForm.style.display = 'block';
    deleteBtn.style.display = 'block';

    firstName.value = currentUser.firstName;
    lastName.value = currentUser.lastName;
    phone.value = currentUser.phone;
    email.value = currentUser.email;
});


deleteBtn.addEventListener('click', function () {
    deleteForm.style.display = 'block';
});

deleteYes.addEventListener('click', function () {
    const users = getContactsFromStore().filter(function(contact) {
        return contact.id !== currentUser.id;
    });
    localStorage.setItem('contacts', JSON.stringify(users));
    blockToAddForm.style.display = 'none';
    blockToEit.style.display = 'none';
    deleteForm.style.display = 'none';
    clearForm();
    showAddressBook();
});

deleteNo.addEventListener('click', function () {
    deleteForm.style.display = 'none';
});


showContactInfo.addEventListener('click', function (event) {
    blockToEit.style.display = "block";
    if (event.target.nodeName === 'LI') {
        const id = parseFloat(event.target.dataset.id);
        const users = getContactsFromStore();
        const user = users.find(function(item) {
            return item.id === id;
        });
        currentUser = user;
        showName.innerText = user.firstName;
        showLastName.innerText = user.lastName;
        showPhone.innerText = user.phone;
        showMail.innerText = user.email;
        if (!user.email) {
            showMail.style.display = 'none';
            mailText.style.display = 'none';
        } else {
            showMail.style.display = 'block';
            mailText.style.display = 'block';
        }
    }
});

clearBtn.addEventListener('click', function() {
    searchInput.value = '';
});

searchInput.addEventListener('keyup', filterContacts);

addBtn.addEventListener('click', addToBook);

addBtn.addEventListener('click', function () {
    deleteForm.style.display = 'none';
    deleteBtn.style.display = 'none';
});

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
        if (currentUser) {
            const users = getContactsFromStore().map(function(contact) {
                return contact.id === currentUser.id ? newContact : contact;
            });
            localStorage.setItem('contacts', JSON.stringify(users));
        } else {
            setContactsFromStore(newContact);
        }
        blockToAddForm.style.display = 'none';
        blockToEit.style.display = 'none';
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
    currentUser = null;
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
