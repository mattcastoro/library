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

    // clears form values
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

// Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// takes user's inputs and stores in array
const myLibrary = [];
myLibrary.push(new Book("The Grapes of Wrath", "John Steinbeck", "300", "read"));
myLibrary.push(new Book("The Warmth of Other Suns", "Isabel Wilkerson", "1000", "not-read"));
myLibrary.push(new Book("A People's History of the United States", "Howard Zinn", "3000", "read"));

function addBookToLibrary() {
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let read = document.querySelector('input[name="radioRead"]:checked');
    
    // form validation
    let radioButtonRead = document.querySelector('input[id="read"]');
    let radioButtonNotRead = document.querySelector('input[id="not-read"]');
    if (title.value == "" 
        || author.value == ""
        || pages.value == ""
        || (radioButtonRead.checked === false & radioButtonNotRead.checked === false)) {
        alert("Please complete all fields!")
        // prevents the closing of the alert form from closing the dialog
        alert.preventDefault();
    } else {
        myLibrary.push(new Book(title.value, author.value, pages.value, read.value));

        // clears form values
        title.value = "";
        author.value = "";
        pages.value = "";
        read.checked = false;

        displayLibrary();
    }      
}

function displayLibrary() {
    myLibrary.forEach((element, index) => {
        // selects main element for card population
        const library = document.querySelector("main");

        // creates card and appends to main element
        const card = document.createElement("div");
        card.classList.add("card");
        library.appendChild(card);

        // creates div with class title and adds title content
        const title = document.createElement("div");
        title.classList.add("title");
        card.appendChild(title);
        title.textContent = element.title;

        // creates div with class author and adds author content
        const author = document.createElement("div");
        author.classList.add("author");
        card.appendChild(author);
        author.textContent = `by ${element.author}`;

        // creates div with class pages and adds pages content
        const pages = document.createElement("div");
        pages.classList.add("pages");
        card.appendChild(pages);
        pages.textContent = `${element.pages} pages`;

        const read = document.createElement("div");
        read.classList.add("read");
        card.appendChild(read);
        read.textContent = element.read;
    });
}

displayLibrary();