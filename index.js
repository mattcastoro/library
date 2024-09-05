const addBook = document.getElementById("addBook");
const displayDialog = document.getElementById("displayDialog")
const confirmBook = document.getElementById("confirmButton");
const cancelBook = document.getElementById("cancelButton");

addBook.addEventListener("click", () => {
    displayDialog.showModal();
});

confirmBook.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayDialog.close();
});

cancelBook.addEventListener("click", (e) => {
    e.preventDefault();
    displayDialog.close();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const myLibrary = [];
function addBookToLibrary() {
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let read = document.querySelector('input[name="radio-read"]:checked');

    myLibrary.push(new Book(title.value, author.value, pages.value, read.value));
    
    console.log(myLibrary);
}





// this.info = function() {
//     return this.title + " by " + this.author + " has " + this.pages + " pages" + " and I have " + this.read + "."
// };