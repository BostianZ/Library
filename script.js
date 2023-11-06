const myLibrary = [];

const addBookBtn = document.getElementById("addbook-btn");
const cancelBookBtn = document.getElementById("cancel-btn");
const modalAddBookBtn = document.getElementById("modal-addbook-btn");
const modal = document.querySelector("dialog");  
const form = document.querySelector("form");
const libraryContainer = document.getElementById("library-container");


const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const numberOfPages = document.getElementById("pages")

function Book(author, title, pages) {
    this.author = author,
    this.title = title,
    this.pages = pages
}

Book.prototype.read = function() {
    //Toggle book's read status (done via button)
    //checked ? read : not read
    const readBook = document.getElementById("read")

}
    
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(myLibrary);
    renderBookList();
}

function renderBookList() {

    if (libraryContainer.hasChildNodes()) {
        libraryContainer.innerHTML = "";
    } 

    for (let i = 0; i < myLibrary.length; i++) {    
        let book = myLibrary[i];
        let card = `
        <div class="library-card" data-id=${i}>
            <div class="library-card-content">
                <div>Book Title: ${book.title}</div>
                <div>Book Author: ${book.author}</div>
                <div>Number of pages: ${book.pages}</div>
            </div>
            <div class="library-card-btns">
                <button id="read-btn">Read</button>
                <button id="delete-btn">Delete</button>
            </div>
        </div>`
        libraryContainer.insertAdjacentHTML("beforeend", card)
    }
}

function deleteBook() {

}


///////////////////////////////
//////EVENT LISTENERS//////////
///////////////////////////////

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let book = new Book(bookTitle.value, bookAuthor.value, numberOfPages.value);
    addBookToLibrary(book);
    modal.close();
})

addBookBtn.addEventListener("click", function() {
    modal.showModal();
})

cancelBookBtn.addEventListener("click", function(e) {
    e.preventDefault();
    modal.close()
})

