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

addBookToLibrary('MyBook', 'Me', 250, true);
addBookToLibrary('YourBook', 'You', 150, false);
console.log(userLibrary);