/* gets elements and stores in global variables */
const addBook = document.getElementById("addBook");
const displayDialog = document.getElementById("displayDialog")
const confirmBook = document.getElementById("confirmButton");
const cancelBook = document.getElementById("cancelButton");
const deleteDialog = document.getElementById("deleteDialog");

/* listens for the user to click the add book button, 
then displays the dialog if clicked */
addBook.addEventListener("click", () => {
    displayDialog.showModal();
});

/* listens for the user to click the confirmation button to add a book, 
calls function to add book to the user's library, then closes the dialog */ 
confirmBook.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayDialog.close();
});

/* listens for the user to click the cnacel button to add a book,
closes the dialog, then clears the user's values added to the form */
cancelBook.addEventListener("click", (e) => {
    e.preventDefault();
    displayDialog.close();

    /* clears form values */
    title.value = "";
    author.value = "";
    pages.value = "";
    let radioButtonRead = document.querySelector('input[id="read"]');
    let radioButtonNotRead = document.querySelector('input[id="not-read"]');
    if (radioButtonRead.checked === true) {
        radioButtonRead.checked = false;
    } else if (radioButtonNotRead.checked === true) {
        radioButtonNotRead.checked = false;
    };
});

let bookId; /* global variable for deleting the correct book */

/* displays delete book confirmation dialog after user clicks the delete book button */
function deleteBook(event) {
    deleteDialog.showModal();
    bookId = event.target.id; /* stores element's id in global variable */
}

/* closes the delete book confirmation dialog after the user clicks the cancel button */
function keepBook() {
    deleteDialog.close();
}

/* deletes book and closes the delete confirmation dialog */
function removeBook() {
    deleteDialog.close();
    myLibrary.splice(bookId[(bookId.length - 4) - 1000], 1);
    const parent = document.querySelector("main");
    const child = document.querySelector(`.card${bookId.slice(9, 13)}`)
    parent.removeChild(child);
}

/* Object constructor for library's set of books */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
const myLibrary = []; /* global array, initialized as empty */

/* obtains user's values, validates that the entire form is completed, 
then clears the form values */
function addBookToLibrary() {
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let read = document.querySelector('input[name="radioRead"]:checked');
    
    /* form validation */
    let radioButtonRead = document.querySelector('input[id="read"]');
    let radioButtonNotRead = document.querySelector('input[id="not-read"]');
    if (title.value == "" 
        || author.value == ""
        || pages.value == ""
        || (radioButtonRead.checked === false & radioButtonNotRead.checked === false)) {
        alert("Please complete all fields!")
        alert.preventDefault(); /* prevents the closing of the alert form from closing the dialog */
    } else {
        myLibrary.push(new Book(title.value, author.value, pages.value, read.value));
        displayLibrary();

        /* clears form values */
        title.value = "";
        author.value = "";
        pages.value = "";
        read.checked = false;
    }      
}

/* grabs the last object in the array, parses the object, 
creates a card with the object's values, and displays it to the user */
function displayLibrary() {
    let lastElement = myLibrary.slice(-1);
    lastElement.forEach((element) => {
        const library = document.querySelector("main"); /* selects main element for card population */

        let counted = counter();

        /* creates card and appends to main element */
        const card = document.createElement("div");
        card.classList.add(`card${counted}`); /* leverages the counter for a GUID */
        library.appendChild(card);

        /* creates a delete button */
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "submit");
        deleteBtn.setAttribute("id", `deleteBtn${counted}`); /* leverages the counter for a GUID */
        deleteBtn.textContent = "X";
        card.appendChild(deleteBtn);
        deleteBtn.setAttribute("onclick", "deleteBook(event)")

        /* creates div with class title and adds title content */
        const title = document.createElement("div");
        title.classList.add("title");
        card.appendChild(title);
        title.textContent = element.title;

        /* creates div with class author and adds author content */
        const author = document.createElement("div");
        author.classList.add("author");
        card.appendChild(author);
        author.textContent = `by ${element.author}`;

        /* creates div with class pages and adds pages content */
        const pages = document.createElement("div");
        pages.classList.add("pages");
        card.appendChild(pages);
        pages.textContent = `${element.pages} pages in length`;

        /* creates div with class read and adds read content */
        const read = document.createElement("div");
        read.classList.add("read");
        card.appendChild(read);
        read.textContent = element.read;

        /* creates div with toggle checkbox */
        const toggleDiv = document.createElement("div");
        toggleDiv.classList.add("toggleDiv");
        card.appendChild(toggleDiv);
        const toggleLabel = document.createElement("label");
        toggleDiv.appendChild(toggleLabel);
        toggleLabel.textContent = "Read";
        const toggle = document.createElement("input");
        toggle.setAttribute("type", "checkbox");
        toggle.setAttribute("class", "toggle");
        toggle.setAttribute("name", "toggle");
        toggleLabel.appendChild(toggle);

        /* auto-checks the box if the book has been read by the user 
        upon adding the book to the library */
        if (element.read == "read") {
            toggle.checked = true;
        }
    });
}

/* counter function to GUID provisions */
let count = 1;
function counter() {
    return count++ + 1000;
}
