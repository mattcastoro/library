const displayDialog = document.getElementById("displayDialog")
const deleteDialog = document.getElementById("deleteDialog");

const title = document.getElementById("title");
const titleError = document.getElementById("titleError");
const author = document.getElementById("author");
const authorError = document.getElementById("authorError");
const pages = document.querySelector("#pages");

const lengthOfBook = document.getElementById("pages");
const pagesError = document.getElementById("pagesError");
const radioError = document.getElementById("radioError");

function displayAddBook() {
  displayDialog.showModal();
}

function confirmBook() {
  validateForm();
  if (findErrors() == "no errors") {
    addBookToLibrary();
    displayDialog.close();
  }
}

function cancelBook() {
  displayDialog.close();
  clearFields();
}

let bookId;
function deleteBook(event) {
    deleteDialog.showModal();
    bookId = event.target.id;
}

function keepBook() {
    deleteDialog.close();
}

function removeBook() {
    deleteDialog.close();
    myLibrary.splice(myLibrary.findIndex(index => index.idNum === Number(bookId.slice(9, 14))), 1);
    const parent = document.querySelector("main");
    const child = document.querySelector(`.card${bookId.slice(9, 14)}`)
    parent.removeChild(child);
}

function updateReadStatus(event) {
    bookId = event.target.id;
    index = myLibrary.findIndex(index => index.idNum === Number(bookId.slice(16, 21)))
    if (myLibrary[index].read === "read") {
        myLibrary[index].read = "not-read";
    } else {
        myLibrary[index].read = "read"
    };
}

class Book {
    constructor(title, author, pages, read, _idNum) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.idNum = counter();
    }
}

const myLibrary = [];
function addBookToLibrary() {
  const read = document.querySelector('input[name="radioRead"]:checked');
  myLibrary.push(new Book(title.value, author.value, pages.value, read.value));
  displayLibrary();
  clearFields();
}

function validateForm() {
  if (title.validity.valueMissing) {
    titleError.textContent = "Please enter a value for the title.";
    titleError.className = "error active";
  } else {
    titleError.textContent = "";
    titleError.className = "error";
  }

  if (author.validity.valueMissing) {
    authorError.textContent = "Please enter a value for the author.";
    authorError.className = "error active";
  } else {
    authorError.textContent = "";
    authorError.className = "error";
  }

  if (lengthOfBook.validity.valueMissing) {
    pagesError.textContent = "Please enter a value for the length of book.";
    pagesError.className = "error active";
  } else if (lengthOfBook.validity.patternMismatch) {
    pagesError.textContent = "Please enter a numerical value for the length of book.";
    pagesError.className = "error active";
  } else {
    pagesError.textContent = "";
    pagesError.className = "error";
  }

  validateRadio()
}
  

function validateRadio() {
  const read = document.getElementsByName("radioRead");
  for (let i = 0; i < read.length; i++) {
    if (read[i].checked) {
      radioError.textContent = "";
      radioError.className = "error";
      return true;
    }
  }
  radioError.textContent = "Please select whether you have read this book.";
  radioError.className = "error active";
}

function findErrors() {
  const activeErrors = document.getElementsByClassName("active");

  if (activeErrors.length == 0) {
    return "no errors";
  } else {
    return "errors";
  }
}

function clearFields() {
  title.value = "";
  titleError.textContent = "";
  titleError.className = "error";

  author.value = "";
  authorError.textContent = "";
  authorError.className = "error";

  pages.value = "";
  pagesError.textContent = "";
  pagesError.className = "error";

  const read = document.getElementsByName("radioRead");
  for (let i = 0; i < read.length; i++) {
    read[i].checked = false;
  }
  radioError.textContent = "";  
  radioError.className = "error";
}

function displayLibrary() {
    let lastElement = myLibrary.slice(-1);
    lastElement.forEach((element) => {
        const library = document.querySelector("main");

        const card = document.createElement("div");
        card.classList.add(`card${element.idNum}`);
        library.appendChild(card);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "submit");
        deleteBtn.setAttribute("id", `deleteBtn${element.idNum}`);
        deleteBtn.textContent = "X";
        card.appendChild(deleteBtn);
        deleteBtn.setAttribute("onclick", "deleteBook(event)")

        const title = document.createElement("div");
        title.classList.add("title");
        card.appendChild(title);
        title.textContent = element.title;

        const author = document.createElement("div");
        author.classList.add("author");
        card.appendChild(author);
        author.textContent = `by ${element.author}`;

        const pages = document.createElement("div");
        pages.classList.add("pages");
        card.appendChild(pages);
        pages.textContent = `${element.pages} pages in length`;

        const toggleDiv = document.createElement("div");
        toggleDiv.classList.add("toggleDiv");
        card.appendChild(toggleDiv);
        const toggleLabel = document.createElement("label");
        toggleDiv.appendChild(toggleLabel);
        toggleLabel.textContent = "Read";
        const toggle = document.createElement("input");
        toggle.setAttribute("type", "checkbox");
        toggle.setAttribute("class", "toggle");
        toggle.setAttribute("id", `updateReadStatus${element.idNum}`);
        toggle.setAttribute("name", "toggle");
        toggle.setAttribute("onchange", "updateReadStatus(event)");
        toggleLabel.appendChild(toggle);

        if (element.read == "read") {
            toggle.checked = true;
        }
    });
}

let count = 10001;
function counter() {
    return count++;
}
