class Library {
  static books = [];

  static addBook(book) {
    this.books.push(book);
    console.log(Library.books);
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class bookModal {
  constructor() {
    this.#cacheDOM();
    this.#modalControl();
      this.#addBook();
      this.card = new Card();
  }
  #cacheDOM() {
    this.bookDetailsDialog = document.getElementById("book-details-dialog");
    this.newBookButton = document.getElementById("new-book");
    this.addBookButton = document.getElementById("add-book");
    this.bookDetailsForm = document.getElementById("book-details-form");
    this.cancelButton = document.getElementById("cancel");
    this.titleInput = this.bookDetailsForm.elements["title"];
    this.authorInput = this.bookDetailsForm.elements["author"];
    this.pagesInput = this.bookDetailsForm.elements["pages"];
    this.read = this.bookDetailsForm.elements["read"];
  }

  #modalControl() {
    // Open book details dialog
    this.newBookButton.addEventListener("click", () => {
      this.bookDetailsDialog.showModal();
    });

    // close the book details dialog
    this.cancelButton.addEventListener("click", () => {
      this.#resetForm();
      this.bookDetailsDialog.close();
    });
  }

  #addBook() {
    this.addBookButton.addEventListener("click", (event) => {
      // prevent the default behavior
      event.preventDefault();

      // add book if form is valid
      if (this.#validateForm()) {
        const book = new Book(
          this.titleInput.value,
          this.authorInput.value,
          this.pagesInput.value,
          this.read.checked
        );
        Library.addBook(book);

        this.card.createCard(book, Library.books.length);

        this.#resetForm();
        // close the book details dialog
        this.bookDetailsDialog.close();
      }
    });
  }

  // reset form
  #resetForm() {
    this.bookDetailsForm.reset();
    this.titleInput = this.bookDetailsForm.elements["title"];
    this.authorInput = this.bookDetailsForm.elements["author"];
    this.pagesInput = this.bookDetailsForm.elements["pages"];

    this.titleInput.className = "";
    this.authorInput.className = "";
    this.pagesInput.className = "";
    this.#removeMessage(this.titleInput);
    this.#removeMessage(this.authorInput);
    this.#removeMessage(this.pagesInput);
  }

  // remove error message
  #removeMessage(element) {
    const message = element.parentNode.querySelector(".message");
    message.innerText = "";
  }
  // check if input is empty or not
  #checkEmpty(element) {
    if (element.value == "") {
      element.className = "error";
      showMessage(element);
      return false;
    } else {
      element.className = "success";
      this.#removeMessage(element);
      return true;
    }
  }
  #validateForm() {
    // show error message
    function showMessage(element) {
      const message = element.parentNode.querySelector(".message");
      message.innerText = "can't be empty";
    }

    // check if value in  number input is correct or not
    function checkValue(element) {
      const message = element.parentNode.querySelector(".message");
      if (element.value == "") {
        element.className = "error";
        message.innerText = "can't be empty";
        return false;
      } else if (element.value <= 0) {
        element.className = "error";
        message.innerText = "enter a value greater than zero";
        return false;
      } else {
        element.className = "success";
        message.innerText = "";
        return true;
      }
    }
    return (
      this.#checkEmpty(this.titleInput) &
      this.#checkEmpty(this.authorInput) &
      checkValue(this.pagesInput)
    );
  }
}

class Card {
  constructor() {}

  // create card
  createCard(book, index) {
    index = index - 1;
    const cards = document.querySelector(".cards");
    let read = "";
    if (book.read) {
      read = "Read";
    } else {
      read = "Not Read";
    }
    const card = `
   <div class="card">
     <div class="info">
        <div>Title</div>
        <div id="title-value">${book.title}</div>
     </div>
     <div class="info">
       <div>Author</div>
       <div id="author-value">${book.author}</div>
     </div>
     <div class="info">
        <div>Pages</div>
        <div id="page-value">${book.pages}</div>
     </div>
     <div class="info">
       <button class="toggle-read">${read}</button>
     </div>
        <div class="index" hidden >${index}</div>
         <div class="remove">
         <button>X</button>
         </div>
     
    </div>
   `;
    cards.innerHTML += card;
    this.addListeners();
  }

  addListeners() {
    // to toggle read or not read status of a book
    const toggleReadButtons = document.querySelectorAll(".toggle-read");
    for (let button of toggleReadButtons) {
      button.addEventListener("click", this.toggleRead);
    }

    // to remove book
    const removeBookButtons = document.querySelectorAll(".remove");
    for (let button of removeBookButtons) {
      button.addEventListener("click", this.removeCard);
    }
  }

  toggleRead(event) {
    const element = event.srcElement;
    const parentElement = element.parentNode.parentNode;
    const index = parentElement.querySelector(".index").innerHTML;

    if (element.innerHTML == "Not Read") {
      element.innerHTML = "Read";
      Library.books[index].read = true;
    } else {
      element.innerHTML = "Not Read";
      Library.books[index].read = false;
    }
    console.log(Library.books);
  }

  removeCard(event) {
    const element = event.srcElement;
    const parentElement = element.parentNode.parentNode;
    const index = parentElement.querySelector(".index").innerHTML;

    parentElement.remove();
    Library.books[index] = "";
    console.log(Library.books);
  }
}

class Controller {
  constructor() {
    new bookModal();
  }
}

new Controller();
// new bookModal();
