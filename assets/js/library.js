let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  let new_book = new Book(title, author, pages, read);
  myLibrary.push(new_book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
console.log(myLibrary);