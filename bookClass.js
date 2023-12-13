class Book {
  constructor(title, author, pages, read) {
    this.myLibrary = [];
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      if (this.read == false) {
        this.readInfo = "not read yet";
      } else if (this.read == true) {
        this.readInfo = "have read";
      }
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readInfo}`;
    };
  }
}

class bookModal {
  constructor() {
    this.#cacheDom();
    this.form = new bookDetailForm();
    this.#modalControls();
      this.#addBook();
  }

  #cacheDom() {
    this.bookDetailsDialog = document.getElementById("book-details-dialog");
    this.newBookButton = document.getElementById("new-book");
    this.addBookButton = document.getElementById("add-book");
    this.cancelButton = document.getElementById("cancel");
  }

  #modalControls() {
    // Open book details dialog
    this.newBookButton.addEventListener("click", () => {
      this.bookDetailsDialog.showModal();
    });

    // close the book details dialog
    this.cancelButton.addEventListener("click", () => {
      this.form.resetForm();
      this.bookDetailsDialog.close();
    });
  }

    #addBook() {
       this.addBookButton.addEventListener("click", addBookToLibrary);
    function addBookToLibrary (event) {
        event.preventDefault();
        console.log(this.form);
      this.data = this.form.getValues();
      this.form.resetForm();
      this.bookDetailsDialog.close();
    };
   
  }

  getData() {
    return this.data;
  }
}

class bookDetailForm {
  constructor() {
      this.#cacheDOM();
  }

  #cacheDOM() {
    this.bookDetailsForm = document.getElementById("book-details-form");
    this.titleInput = this.bookDetailsForm.elements["title"];
    this.authorInput = this.bookDetailsForm.elements["author"];
    this.pagesInput = this.bookDetailsForm.elements["pages"];
    this.title = this.titleInput.value;
    this.author = this.authorInput.value;
    this.pages = this.pagesInput.value;
    this.read = this.bookDetailsForm.elements["read"].checked;
  }

  #validateForm() {
    checkEmpty = (element) => {
      if (element.value == "") {
        element.className = "error";
        this.#showMessage(element);
        return false;
      } else {
        element.className = "success";
        this.#removeMessage(element);
        return true;
      }
    };

    checkValue = (element) => {
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
    };

    return (
      checkEmpty(this.titleInput) &
      checkEmpty(this.authorInput) &
      checkValue(this.pagesInput)
    );
  }

  resetForm() {
    this.bookDetailsForm.reset();

    this.titleInput.className = "";
    this.authorInput.className = "";
    this.pagesInput.className = "";

    this.#removeMessage(this.titleInput);
    this.#removeMessage(this.authorInput);
    this.#removeMessage(this.pagesInput);
  }
  // show error message
  #showMessage(element) {
    const message = element.parentNode.querySelector(".message");
    message.innerText = "can't be empty";
  }

  // remove error message
  #removeMessage(element) {
    const message = element.parentNode.querySelector(".message");
    message.innerText = "";
  }

  getValues() {
    
      return {
        title,
        author,
        pages,
        read,
      };
    
  }
}

class bookCard {
  constructor(book) {
    this.#cacheDOM();
      this.book = book;
      this.createCard();
  }
  #cacheDOM() {
    this.cards = document.querySelector(".cards");
    this.toggleReadButtons = document.querySelectorAll(".toggle-read");
    this.removeBookButtons = document.querySelectorAll(".remove");
  }

  #toggleRead(event) {
    const element = event.srcElement;
    const parentElement = element.parentNode.parentNode;
    const index = parentElement.querySelector(".index").innerHTML;

    if (element.innerHTML == "Not Read") {
      element.innerHTML = "Read";
      this.book.myLibrary[index].read = true;
    } else {
      element.innerHTML = "Not Read";
      this.book.myLibrary[index].read = false;
    }
    console.log(this.book.myLibrary);
  }

  #removeCard(event) {
    const element = event.srcElement;
    const parentElement = element.parentNode.parentNode;
    const index = parentElement.querySelector(".index").innerHTML;

    parentElement.remove();
    this.book.myLibrary[index] = "";
    console.log(this.book.myLibrary);
  }

  #addListeners = () => {
    // to toggle read or not read status of a book
    for (button of this.toggleReadButtons) {
      button.addEventListener("click", this.#toggleRead);
    }

    // to remove book
    for (button of this.removeBookButtons) {
      button.addEventListener("click", this.#removeCard);
    }
  };

  // create card
  createCard() {
    let read = "";
    if (this.book.read) {
      read = "Read";
    } else {
      read = "Not Read";
    }
    const card = `
   <div class="card">
     <div class="info">
        <div>Title</div>
        <div id="title-value">${this.book.title}</div>
     </div>
     <div class="info">
       <div>Author</div>
       <div id="author-value">${this.book.author}</div>
     </div>
     <div class="info">
        <div>Pages</div>
        <div id="page-value">${this.book.pages}</div>
     </div>
     <div class="info">
       <button class="toggle-read">${this.read}</button>
     </div>
        <div class="index" hidden >${this.index}</div>
         <div class="remove">
         <button>X</button>
         </div>
     
    </div>
   `;
    this.cards.innerHTML += card;
    this.#addListeners();
  }
}


class Controller{
    constructor() {
        this.modal = new bookModal();
        this.book = new Book(this.modal.getData());
        // this.bookCard = new bookCard(this.book);
    }
}

new Controller();
