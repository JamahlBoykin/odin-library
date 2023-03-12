let uniqueID = 1;
const myLibrary = [];
const addBookForm = document.getElementById('new_book_form');
const yesButton = document.querySelector('.yes-button');
const noButton = document.querySelector('.no-button');

function Book(title, author, pages, read, ID) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.ID = ID;
}

Book.prototype.info = function () {
  const bookTitle = document.createElement('div');
  bookTitle.classList.add('title-text');
  bookTitle.textContent = this.title;

  const bookAuthor = document.createElement('div');
  bookAuthor.classList.add('author-text');
  bookAuthor.textContent = 'by ' + this.author;

  const bookPages = document.createElement('div');
  bookPages.classList.add('pages-text');
  if (this.pages !== '1') {
    bookPages.textContent = this.pages + ' pages.';
  } else {
    bookPages.textContent = this.pages + ' page.';
  }

  const bookRead = document.createElement('div');
  bookRead.classList.add('read-text');
  if (this.read) {
    bookRead.textContent = 'Finished reading.';
  } else {
    bookRead.textContent = 'Not read yet.';
  }

  return [bookTitle, bookAuthor, bookPages, bookRead];
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read, uniqueID));
  uniqueID += 1;
}

function displayBooks() {
  const main = document.querySelector('.main');
  let displayCount = document.querySelectorAll('.book').length;

  for (; displayCount < myLibrary.length; displayCount++) {
    const book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('data-id', myLibrary[displayCount].ID);
    myLibrary[displayCount].info().forEach((element) => {
      book.appendChild(element);
    });

    const readCheckbox = document.createElement('input');
    readCheckbox.setAttribute('type', 'checkbox');
    if (myLibrary[displayCount].read) readCheckbox.checked = true;
    readCheckbox.addEventListener('click', updateReadText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', confirmBookRemoval);

    main.appendChild(book);
    book.appendChild(readCheckbox);
    book.appendChild(deleteButton);
  }
}

function openForm() {
  document.getElementById('new_book_form').style.display = 'grid';
  document.querySelector('.fade-bg').style.display = 'block';
}

function closeForm() {
  document.getElementById('new_book_form').style.display = 'none';
  document.querySelector('.fade-bg').style.display = 'none';
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

function updateReadText(bookInfo) {
  bookInfo.target.className += 'bookFinder';
  const book = document.querySelector('.book:has(.bookFinder)');
  book.querySelector('.bookFinder').classList.remove('bookFinder');

  const bookIndex = myLibrary.findIndex(
    ({ ID }) => ID === Number(book.getAttribute('data-id'))
  );

  if (myLibrary[bookIndex].read === false) {
    myLibrary[bookIndex].read = true;
  } else {
    myLibrary[bookIndex].read = false;
  }

  let readText = book.querySelector('.read-text');
  if (readText.textContent === 'Not read yet.') {
    readText.textContent = 'Finished reading.';
  } else {
    readText.textContent = 'Not read yet.';
  }
}

function confirmBookRemoval(bookInfo) {
  bookInfo.target.className += 'bookFinder';
  const book = document.querySelector('.book:has(.bookFinder)');
  book.querySelector('.bookFinder').classList.remove('bookFinder');

  const bookIndex = myLibrary.findIndex(
    ({ ID }) => ID === Number(book.getAttribute('data-id'))
  );

  document.querySelector('.confirmation-text').textContent =
    'Are you sure you want to remove "' + myLibrary[bookIndex].title + '"?';
  document.querySelector('.fade-bg').style.display = 'block';
  document.querySelector('.delete-confirmation').style.display = 'grid';

  function removeBook() {
    myLibrary.splice(bookIndex, 1);
    book.remove();
    closeConfirmation();
  }

  function closeConfirmation() {
    yesButton.removeEventListener('click', removeBook);
    document.querySelector('.confirmation-text').textContent = '';
    document.querySelector('.fade-bg').style.display = 'none';
    document.querySelector('.delete-confirmation').style.display = 'none';
  }

  yesButton.addEventListener('click', removeBook);
  noButton.addEventListener('click', closeConfirmation);
}
