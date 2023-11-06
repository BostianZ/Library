const myLibrary = [];

const newBookBtn = document.getElementById("newbook-btn");
const modalCancelBookBtn = document.getElementById("modal-cancel-btn");
const hasReadCheckbox = document.getElementById("read")
const readBtn = document.getElementById("read-btn");

const modal = document.querySelector("dialog");  
const form = document.querySelector("form");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const numberOfPages = document.getElementById("pages")

function Book(author, title, pages, hasRead) {
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.hasRead = hasRead
}

Book.prototype.read = function() {
    //Toggle book's read status (done via button)
    //checked ? read : not read
    this.hasRead ? this.hasRead = false : this.hasRead = true;
    renderBookList();
}
    
function addBookToLibrary(book) {
    myLibrary.push(book);
    renderBookList();
}

function renderBookList() {
    const libraryContainer = document.getElementById("library-container");

    if (libraryContainer.hasChildNodes()) {
        libraryContainer.innerHTML = "";
    } 

    for (let i = 0; i < myLibrary.length; i++) {    
        let book = myLibrary[i];
        let card = `
        <div class="library-card">
            <div class="library-card-content">
                <div>Book Title: ${book.title}</div>
                <div>Book Author: ${book.author}</div>
                <div>Number of pages: ${book.pages}</div>
                <div>Has read this bool: ${book.hasRead}</div>
            </div>
            <div class="library-card-btns">
                <button id="read-btn" data-id=${i} onclick="readBook(event)">Read</button>
                <button id="delete-btn" data-id=${i} onclick="deleteBook(event)">Delete</button>
            </div>
        </div>`
        libraryContainer.insertAdjacentHTML("beforeend", card)
    }
}

function deleteBook(e) {
    // We click on the delete button
    // We get the ID of the library card
    let id = e.target.dataset.id
    //Because the ID is associated with the index of the item clicked
    //We can splice the deleted library card out of the array and re-render the list.
    myLibrary.splice(id, 1);
    renderBookList();
}

function readBook(e) {
  let id = e.target.dataset.id
  let book = myLibrary[id];
  book.read();
}




///////////////////////////////
//////EVENT LISTENERS//////////
///////////////////////////////

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let hasRead;
    hasReadCheckbox.checked ? hasRead = true : hasRead = false;
    let book = new Book(bookTitle.value, bookAuthor.value, numberOfPages.value, hasRead);
    addBookToLibrary(book);
    console.log(book);
    modal.close();
})

newBookBtn.addEventListener("click", function() {
    modal.showModal();
})

modalCancelBookBtn.addEventListener("click", function(e) {
    e.preventDefault();
    modal.close()
})
