const searchInput = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
var blockToAddForm = document.querySelector('.blockAdd');
var openBtn = document.getElementById('openBtn');
var cancelBtn = document.getElementById('cancelBtn');
var addBtn = document.getElementById('addBtn');



clearBtn.addEventListener('click', function() {
    searchInput.value = '';
});
openBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "block";
});
cancelBtn.addEventListener('click', function () {
    blockToAddForm.style.display = "none";
    clearForm();
});