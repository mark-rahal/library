function validateISBN() {
    console.log('validating...');
    if (document.forms['isbn-search-form']['isbn-input'].value === '') {
        alert('Please enter an ISBN!');
        return false;
    }
}

function validateString() {
    return true;
}