const myLibrary = [];

const newBookBtn = document.querySelector(".newbook-btn");
const modalCancelBookBtn = document.querySelector(".modal-cancel-btn");
const hasReadCheckbox = document.getElementById("read")
const modal = document.querySelector("dialog");  
const form = document.querySelector("form");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const numberOfPages = document.getElementById("pages")

function Book(title, author, pages, hasRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead
}

Book.prototype.read = function(id) {
    //Toggle book's read status (done via button)
    //this references book obj

    this.hasRead === "Nope" ? 
        this.hasRead = "Read" :   
        this.hasRead = "Nope";

    console.log(this);

    renderBookList();
}
    
function addBookToLibrary(book) {
    myLibrary.push(book);
    renderBookList();
}

function renderBookList() {
    const libraryContainer = document.querySelector(".library-container");

    if (libraryContainer.hasChildNodes()) {
        libraryContainer.innerHTML = "";
    } 

    for (let i = 0; i < myLibrary.length; i++) {    
        let book = myLibrary[i];
        let card = `
        <div class="library-card">
            <table class="library-card-content">
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td>${book.title}</td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td>${book.author}</td>
                    </tr>
                    <tr>
                        <td>Pages:</td>
                        <td>${book.pages}</td>
                    </tr>
                    <tr>
                        <td>Read status:</td>
                        <td>${book.hasRead}</td>
                    </tr>
                </tbody>
            </table>
            <div class="library-card-btns">
                <button class="read-btn" data-id=${i} onclick="readBook(event)">Read</button>
                <button class="delete-btn" data-id=${i} onclick="deleteBook(event)">Delete</button>
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
  book.read(id);
}

///////////////////////////////
//////EVENT LISTENERS//////////
///////////////////////////////

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let hasRead;

    hasReadCheckbox.checked ? hasRead = "Read" : hasRead = "Nope";

    let book = new Book(bookTitle.value, bookAuthor.value, numberOfPages.value, hasRead);

    addBookToLibrary(book);

    modal.close();
    form.reset();
})

newBookBtn.addEventListener("click", function() {
    modal.showModal();
})

modalCancelBookBtn.addEventListener("click", function(e) {
    e.preventDefault();
    modal.close();
    form.reset();
})
