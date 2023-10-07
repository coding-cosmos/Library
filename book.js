const myLibrary = []

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if(this.read == false){
            this.readInfo = "not read yet"
        }
        else if(this.read == true){
            this.readInfo = "have read"
        }
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.readInfo}`)   
    }
}


const bookDetailsDialog = document.getElementById('book-details-dialog');
const newBookButton = document.getElementById('new-book');
const addBookButton = document.getElementById('add-book');
const bookDetailsForm = document.getElementById('book-details-form');
const cancelButton = document.getElementById('cancel');


// Open book details dialog
newBookButton.addEventListener('click',()=>{
    bookDetailsDialog.showModal();    
});

// close the book details dialog
cancelButton.addEventListener('click',()=>{
    resetForm();
    bookDetailsDialog.close()
});

// Add Book
addBookButton.addEventListener('click',addBookToLibrary);
function addBookToLibrary(event){
    // prevent the default behavior
    event.preventDefault();

    // check if form is valid
    const valid = validateForm();

    // add book if form is valid 
    if (valid) {
      // get all the form values
      title = bookDetailsForm.elements["title"].value;
      author = bookDetailsForm.elements["author"].value;
      pages = bookDetailsForm.elements["pages"].value;
      read = bookDetailsForm.elements["read"].checked;

      // create a new book object and add to myLibrary
      book = new Book(title, author, pages, read);
      myLibrary.push(book);
      console.log(myLibrary);

      createCard(book,myLibrary.length);

      // reset form
      resetForm();

      // close the book details dialog
      bookDetailsDialog.close();
    }
    
}

// function to validate form
function validateForm(){
    titleInput = bookDetailsForm.elements['title'];
    authorInput = bookDetailsForm.elements['author'];
    pagesInput = bookDetailsForm.elements['pages'];
    
   return (checkEmpty(titleInput) &
   checkEmpty(authorInput)&
   checkValue(pagesInput));
    
}

// check if input is empty or not
function checkEmpty(element){
    if(element.value==''){
        element.className = 'error';
        showMessage(element);
        return false;
    }else{
        element.className = 'success';
        removeMessage(element);
        return true;
    }
}

// check if value in  number input is correct or not
function checkValue(element){
   const message =  element.parentNode.querySelector('.message');
    if(element.value==''){
        element.className = "error";
        message.innerText = "can't be empty";
        return false;
       
    }else if(element.value<=0){
        element.className = "error";
        message.innerText = "enter a value greater than zero";
        return false;
       
    }else{
        element.className = "success";
        message.innerText="";
        return true;
    }
}

// show error message
function showMessage(element){
    const message = element.parentNode.querySelector('.message');
    message.innerText = "can't be empty";
}
// remove error message
function removeMessage(element){
    const message = element.parentNode.querySelector('.message');
    message.innerText = "";
}

// reset form
function resetForm(){
    bookDetailsForm.reset();
    titleInput = bookDetailsForm.elements['title'];
    authorInput = bookDetailsForm.elements['author'];
    pagesInput = bookDetailsForm.elements['pages'];

    titleInput.className = '';
    authorInput.className = '';
    pagesInput.className = '';
    removeMessage(titleInput);
    removeMessage(authorInput);
    removeMessage(pagesInput);
}

// create card 
function createCard(book,index){
    index = index-1;
   const cards = document.querySelector('.cards');
   let read = '';
   if(book.read){
    read = 'Read';
   }else{
     read = 'Not Read';
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
   addListeners();
}

function addListeners(){

    // to toggle read or not read status of a book
    const toggleReadButtons = document.querySelectorAll('.toggle-read');
    for(button of toggleReadButtons){
        button.addEventListener('click',toggleRead);
    }
   
    // to remove book 
    const removeBookButtons = document.querySelectorAll('.remove');
    for(button of removeBookButtons){
        button.addEventListener('click',removeCard);
    }
    
}

function toggleRead(event){
   const element = event.srcElement;
   const parentElement = element.parentNode.parentNode;
   const index = parentElement.querySelector('.index').innerHTML;
   
   if(element.innerHTML =='Not Read'){
    element.innerHTML = 'Read';
    myLibrary[index].read = true;
   }else{
    element.innerHTML ='Not Read';
    myLibrary[index].read = false;
   }
   console.log(myLibrary);
}           

function removeCard(event){
    const element = event.srcElement;
   const parentElement = element.parentNode.parentNode;
   const index = parentElement.querySelector('.index').innerHTML;

   parentElement.remove();
   myLibrary[index] = '';
   console.log(myLibrary);

}