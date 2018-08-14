const searchInput = document.getElementById('filter');
const clearBtn = document.getElementById('clear');

clearBtn.addEventListener('click', function() {
    searchInput.value = '';
});