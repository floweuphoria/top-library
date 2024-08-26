const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Create book instances
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 310, true);
const book2 = new Book('1984', 'George Orwell', 328, false);
const book3 = new Book('The Catcher in the Rye', 'J.D. Salinger', 277, true);

// Add books to the library
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

function createBookCard(title, author, pages, read, index) {
  let newCard = document.createElement('div');
  newCard.className = 'card';
  newCard.setAttribute('data-index', index);
  newCard.innerHTML = `<h4>${title}</h4><p>by ${author}</p><p>${pages}</p><p>${read ? `✅ Read` : `☑️ Unread`}</p><button class="read">Read</button><a href="#" class='remove-book'>X</a>`;

  return newCard;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  let container = document.querySelector('.container');
  let index = myLibrary.length - 1;
  let card = createBookCard(title, author, pages, read, index);
  container.appendChild(card);
}

function clearFields() {
  document.querySelector("#title").value = '';
  document.querySelector("#author").value = '';
  document.querySelector("#pages").value = '';
  document.querySelector("#isRead").checked = false;
}

function displayBooks() {
  let container = document.querySelector('.container');
  myLibrary.forEach((book, index) => {
    let card = createBookCard(book.title, book.author, book.pages, book.read, index);
    container.appendChild(card);
  });
}

function clearBooks() {
  document.querySelector('.container').innerHTML = '';
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".open-button");
const closeButton = document.querySelector(".close-modal");
const form = document.querySelector('form');

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});


// "Add" button adds to library
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = parseInt(document.querySelector("#pages").value, 10);
  let read = document.querySelector("#isRead").checked
  addBookToLibrary(title, author, pages, read);
  clearFields();
  dialog.close();
});


closeButton.addEventListener("click", () => {
  dialog.close();
});

document.querySelector('.container').addEventListener('click', (e) => {
  let index = e.target.parentNode.getAttribute('data-index');
  if (e.target.className === 'remove-book') {
    e.target.parentNode.remove();
    myLibrary.splice(index, 1);
    displayBooks();
  }
  if (e.target.className === 'read') {
    myLibrary[index].read = !myLibrary[index].read;
    clearBooks();
    displayBooks();
  }
})


displayBooks();