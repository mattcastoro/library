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

const myLibrary = [

];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    console.log("book added to library")
}

// const book1 = new Book("The Hobbit", "JRR Tolkein", 295, "not yet read");
// const book2 = new Book("The Great Gatsby", "F Scott Fitzgerald", 200, "read it");
// const book3 = new Book("The Grapes of Wrath", "John Steinbeck", 150, "read it");




// this.info = function() {
//     return this.title + " by " + this.author + " has " + this.pages + " pages" + " and I have " + this.read + "."
// };