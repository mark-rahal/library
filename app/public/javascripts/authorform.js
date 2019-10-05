function addAuthorForm() {
    var container = document.getElementById('author-input');
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.placeholder = 'Author';
    input.name= 'book-author-input';
    container.insertBefore(input, document.getElementById('add-author-button'));
}

function removeAuthorForm() {
    var authorForms = document.getElementsByName('book-author-input');
    authorForms[authorForms.length - 1].remove();
}