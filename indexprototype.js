console.log("This is index/js");

// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view


add();
// constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor
function Display() {

}



// Add methods to display prototype
Display.prototype.add = function () {
    let bookKey  = localStorage.getItem("bookKey");
    if (bookKey == null) {
        bookArr = [];
    } else {
        bookArr = JSON.parse(bookKey);
    }
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody'); 
    bookArr.forEach(function(element) {
        tableBody.innerHTML += `
            <tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            </tr>`;; 
    });
}

// Implement the clear function
Display.prototype.clear = function (book) {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();

}

// Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.lengthn < 2) {
        return false;
    }
    else {
        return true;
    }
    
}

// Implement the show function
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
            message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>Message: </strong> ${displayMessage}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `
    setTimeout(function() {
        message.innerHTML = "";
    }, 2000);
}

// Add submit event listener to libraryform
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value; 
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    // Get books from the local Storage
    let bookKey  = localStorage.getItem("bookKey");
    if (bookKey == null) {
        bookArr = [];
    } else {
        bookArr = JSON.parse(bookKey);
    }
    let book = new Book(name, author, type);
    console.log(book);
    let display = new Display();
    if (display.validate(book)) { 
        bookArr.push(book);

        // Add books to the localStorage
        localStorage.setItem("bookKey", JSON.stringify(bookArr));
        display.add();
        display.clear(book);
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
        display.clear(book);
    }
    e.preventDefault();
} 