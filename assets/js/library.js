let myLibrary = [];

// Constructor for books
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

// Function to add new book to library
function addBookToLibrary(title, author, pages, read) {
  let new_book = new Book(title, author, pages, read);
  myLibrary.push(new_book);
}

// Function to render book details in html
function render() {
  renderTableHeader(Book);
  renderLibraryBooks();

  // create table header from constructor properties and render
  function renderTableHeader(constructorObject) {
    // create 'tr' in memory
    let row = document.createElement("tr");

    // create book object to iterate over properties
    let constructedObject = new constructorObject();

    // Iterate over properties of book object
    for (let prop in constructedObject) {
      // Ensure propeties are not inherited  
      if (isOwnProp(constructedObject, prop) && prop != "info") {
        // Capitalize first letter of property
        let capitalizedProp = prop.replace(/^\w/, prop[0].toUpperCase());

        // Create 'th' in memory
        let table_heading = document.createElement("th");
        table_heading.textContent = capitalizedProp;

        // Append 'th' to 'tr'
        row.appendChild(table_heading);
      }
    }
    // Append 'tr' to 'table' to render in html
    table.appendChild(row);
  }

  // create table rows with book details from myLibrary array
  function renderLibraryBooks() {
    // Iterate over all books in myLibrary array
    myLibrary.forEach(function(book) {
      // create 'tr' in memory
      let row = document.createElement("tr");

      // Iterate over properties of book object
      for (let prop in book) {
        // Ensure propeties are not inherited and not the 'info method
        if (isOwnProp(book, prop) && prop != "info") {
          // Create 'th' in memory
          let table_data = document.createElement("td");
          table_data.textContent = book[prop];

          // Append 'td' to 'tr'
          row.appendChild(table_data);
        }
      }
      // Append 'tr' to 'table' to render in html
      table.appendChild(row);
    });
  }

  // Returns boolean if property in object not inherited
  function isOwnProp(object, prop) {
    return object.hasOwnProperty(prop);
  }
}

function createModalForm() {
  // Create background
  let background = document.createElement("div");
  background.classList.add("modalFormBackground");
  body.style.overflow = "hidden";
  body.appendChild(background);

  // Create form
  let form = document.createElement("form");
  createTextInput("Title", "text", "title", "title", "Title");
  createTextInput("Author", "text", "author", "author", "Author");
  createTextInput("No_of_pages", "number", "no_of_pages", "no_of_pages", "No_of_pages");
  createReadStatusDropdown("Read", "Not Read");

  let btnContainer = document.createElement("div");
  btnContainer.classList.add("btnContainer");

  // Create button
  let addBookBtn = document.createElement("button");
  addBookBtn.textContent = "Add Book";
  addBookBtn.type ="submit";
  addBookBtn.style.marginRight = "5px";
  btnContainer.appendChild(addBookBtn);

  // Cancel button
  let cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";
  cancelBtn.style.marginLeft = "5px";
  btnContainer.appendChild(cancelBtn);
  btnContainer.style.textAlign = "center";

  form.appendChild(btnContainer);
  
  background.appendChild(form);

  cancelBtn.addEventListener("click", e => {
    body.removeChild(background);
    body.style.overflow = "visible";
  });

  // 
  addBookBtn.addEventListener("click", e => {
    if (!checkValidFormData()) {
      e.preventDefault();
    } else {
      createBookFromFormData(e);
      renderLastAddedBook();
    }

    body.removeChild(background);
    body.style.overflow = "visible";
  });

  function checkValidFormData() {
    let new_title = document.querySelector("#title");
    let new_author = document.querySelector("#author");
    let new_no_of_pages = document.querySelector("#no_of_pages");

    if (new_title.value === "" || new_title.value.search(/^\s*$/) === 0) {
      return false;
    } else if (new_author.value === "" || new_author.value.search(/^\s*$/) === 0) {
      return false;
    } else if (new_no_of_pages.value === "" ||
               new_no_of_pages.value.search(/^\s*$/) === 0 ||
               new_no_of_pages.value.search(/[^A-Za-z]/) === -1) {
      return false;
    }

    return true;
  }

  function createBookFromFormData(e) {
    e.preventDefault();

    let new_title = document.querySelector("#title");
    console.log(new_title.value);

    let new_author = document.querySelector("#author");
    console.log(new_author.value);

    let new_no_of_pages = document.querySelector("#no_of_pages");
    console.log(new_no_of_pages.value);

    let read_status = document.querySelector("#read_status");
    console.log(read_status.value);

    addBookToLibrary(new_title.value, new_author.value, Number(new_no_of_pages.value), read_status.value);
  }

  function createTextInput(labelContent, inputType, inputId, inputName, inputPlaceholder) {
    let title_label = document.createElement("label");
    title_label.textContent = labelContent;
    let title_input = document.createElement("input");
    title_input.setAttribute("type", inputType);
    title_input.setAttribute("id", inputId);
    title_input.setAttribute("name", inputName);
    title_input.setAttribute("placeholder", inputPlaceholder);
    
    form.appendChild(title_label);
    form.appendChild(title_input);
  }

  function createReadStatusDropdown() {
    let read_status_label = document.createElement("label");
    read_status_label.textContent = "Read Status";
    read_status_label.setAttribute("for", "read_status");
    
    let select_read_status = document.createElement("select");
    select_read_status.setAttribute("name", "read_status");
    select_read_status.setAttribute("id", "read_status");
  
    let options = Array.from(arguments);
    options.forEach(function(option) {
      let read_option = document.createElement("option");
      read_option.textContent = option;
      read_option.value = option;
      select_read_status.appendChild(read_option);
    });

    form.appendChild(read_status_label);
    form.appendChild(select_read_status);
  }

  function renderLastAddedBook() {
    // create 'tr' in memory
    let row = document.createElement("tr");

    let latestBook = myLibrary[myLibrary.length - 1];

    // Iterate over properties of book object
    for (let prop in latestBook) {
      // Ensure propeties are not inherited and not the 'info method
      if (isOwnProp(latestBook, prop) && prop != "info") {
        // Create 'th' in memory
        let table_data = document.createElement("td");
        table_data.textContent = latestBook[prop];

        // Append 'td' to 'tr'
        row.appendChild(table_data);
      }
    }

    // Append 'tr' to 'table' to render in html
    table.appendChild(row);

    // Returns boolean if property in object not inherited
    function isOwnProp(object, prop) {
      return object.hasOwnProperty(prop);
    }
  }
}

// Add random books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary("The 48 Laws of Power", "Robert Greene", 480, "not read yet");
addBookToLibrary("The Prince", "Niccolo Machiavelli", 112, "not read yet");
addBookToLibrary("Tides of War", "Steven Pressfield", 448, "not read yet");

// Display in console
console.log(myLibrary);

let body = document.querySelector("body");

let table = document.createElement("table");
table.classList.add("library-of-books");
body.appendChild(table);

// Render Table of books with details
render();

// button to add new book
let newBookBtn = document.createElement("button");
newBookBtn.textContent = "NEW BOOK";
newBookBtn.classList.add("btn", "btn-primary");
newBookBtn.setAttribute("id", "new_book_btn");
body.appendChild(newBookBtn);

newBookBtn.addEventListener("click", e => {
  createModalForm();
});

// render each book in console
myLibrary.forEach(function(book) {
  console.log(book.info());
});