let userLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addBookToLibrary = (title, author, pages, read) => {
  const book = new Book(title, author, pages, read);
  userLibrary.push(book);
}

const updateLibrary = () => {
  const library = document.querySelector(".library-container");
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  userLibrary.map((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");
    bookCard.dataset.bookIndex = `${index}`;

    const bookTitle = document.createElement("p");
    bookTitle.setAttribute("class", "book-title");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", "book-author");
    bookAuthor.textContent = `Author: ${book.author}`;

    const bookPages = document.createElement("p");
    bookPages.setAttribute("class", "book-pages");
    bookPages.textContent = `Pages: ${book.pages}`;

    const bookReadContainer = document.createElement("div");
    bookReadContainer.setAttribute("class", "book-read-container");

    const bookReadLabel = document.createElement("label");
    bookReadLabel.setAttribute("class", "book-read-label");
    bookReadLabel.textContent = "Read";

    const bookReadCheckbox = document.createElement("input");
    bookReadCheckbox.setAttribute("class", "book-read-checkbox");
    bookReadCheckbox.setAttribute("type", "checkbox");
    if (book.read === true) {
      bookReadContainer.classList.add("book-read-toggle");
      bookReadCheckbox.setAttribute("checked", "checked");
    }

    bookReadCheckbox.addEventListener("change", () => {
      const userLibraryIndex = Number(bookReadCheckbox.closest("[data-book-index]").dataset.bookIndex);
      if (userLibrary[userLibraryIndex].read === true) {
        userLibrary[userLibraryIndex].read = false;
      } else {
        userLibrary[userLibraryIndex].read = true;
      }
      bookReadContainer.classList.toggle("book-read-toggle");
    })

    bookReadContainer.append(bookReadLabel, bookReadCheckbox);

    const removeButton = document.createElement("button");
    removeButton.textContent = "delete";
    removeButton.addEventListener('click', () => {
      removeBook(removeButton.parentElement.dataset.bookIndex);
    })

    bookCard.append(bookTitle, bookAuthor, bookPages, bookReadContainer, removeButton);
    library.append(bookCard);
  })
}

const removeBook = (bookIndex) => {
  console.log(userLibrary);
  console.log(bookIndex);
  userLibrary.splice(bookIndex, 1);
  console.log(userLibrary);
  updateLibrary(userLibrary);
}

const openBookFormButton = document.querySelector('[data-book-form-target]');
const closeBookFormButton = document.querySelector('[data-close-book-form]');
const overlay = document.getElementById('overlay');

openBookFormButton.addEventListener('click', () => {
  const formContent = document.querySelector(openBookFormButton.dataset.bookFormTarget);
  openBookForm(formContent);
})

closeBookFormButton.addEventListener('click', () => {
  const formContent = closeBookFormButton.closest('.book-form');
  closeBookForm(formContent);
})

overlay.addEventListener('click', () => {
  const formContent = document.querySelector('.book-form.active');
  closeBookForm(formContent);
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let bookTitle = document.querySelector('#book-title-input').value;
  let bookAuthor = document.querySelector('#book-author-input').value;
  let bookPages = document.querySelector('#book-pages-input').value;
  let bookRead = document.querySelector('#book-read-input').checked;
  addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
  updateLibrary();
  closeBookForm(document.querySelector('.book-form'));
  bookTitle = '';
  console.log(bookTitle);
})

openBookForm = (content) => {
  if (content == null) return;
  document.querySelector('form').reset();
  content.classList.add('active');
  overlay.classList.add('active');
}

closeBookForm = (content) => {
  if (content == null) return;
  content.classList.remove('active');
  overlay.classList.remove('active');
}

addBookToLibrary('MyBook', 'Me', 250, true);
addBookToLibrary('YourBook', 'You', 150, false);
addBookToLibrary('MyBook', 'Me', 250, true);
addBookToLibrary('YourBook', 'You', 150, false);
addBookToLibrary('MyBook', 'Me', 250, true);
addBookToLibrary('YourBook', 'You', 150, false);
updateLibrary();
console.log(userLibrary);