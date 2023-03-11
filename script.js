let displayCount = 0;
const myLibrary = [];
const addBookForm = document.getElementById('new_book_form');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  let pageText = 'pages';
  if (this.pages === '1') pageText = 'page';

  if (this.read) {
    return `${this.title} by ${this.author}, ${this.pages} ${pageText}, read.`;
  }

  return `${this.title} by ${this.author}, ${this.pages} ${pageText}, not read yet.`;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
  const main = document.querySelector('.main');
  for (; displayCount < myLibrary.length; displayCount++) {
    const book = document.createElement('div');
    main.appendChild(book);
    book.textContent = myLibrary[displayCount].info();
  }
}

function openForm() {
  document.getElementById('new_book_form').style.display = 'grid';
}

function closeForm() {
  document.getElementById('new_book_form').style.display = 'none';
  addBookForm
    .querySelectorAll('input[type="text"], input[type="number"]')
    .forEach((input) => {
      input.value = '';
    });
  document.querySelector('input[type="checkbox"]').checked = true;
}

function submitForm(event) {
  event.preventDefault();
  addBookToLibrary(
    document.querySelector('input[name="title"]').value,
    document.querySelector('input[name="author"]').value,
    document.querySelector('input[name="pages"]').value,
    document.querySelector('input[name="read"]').checked
  );
  displayBooks();
  closeForm();
}

addBookForm.addEventListener('submit', submitForm);
