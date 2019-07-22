function validateISBN() {
    console.log('validating...');
    if (document.forms['isbn-form']['isbn-input'].value === '') {
        alert('Please enter an ISBN!');
        return false;
    }
}