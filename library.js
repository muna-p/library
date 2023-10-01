let myLibrary = [];

class Book {
    constructor(title,author,page,read) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = Boolean(read);
    }
}

const bookContainer = document.getElementById('container-books');
const addBook = document.getElementById("add-book");
const mainDialog = document.getElementById("main-dialog");
const inputForm = mainDialog.querySelectorAll("input");
const submitBtn = document.getElementById("submit-button");
const responseBox = document.getElementById("response");
const cancelBtn = document.getElementById("cancel-button");
const pagesRead = document.getElementById("pages-read");
const form = document.getElementById('form-container');

Book.prototype.displayBook = function () {
    const bookCard = document.createElement('div');
    bookCard.id = "book-card";
    bookContainer.appendChild(bookCard);

    const titleDisplay = document.createElement('div');
    titleDisplay.textContent = this.title;
    bookCard.appendChild(titleDisplay);
  
    const authorDisplay = document.createElement('div');
    authorDisplay.textContent = this.author;
    bookCard.appendChild(authorDisplay);

    const imgPage = document.createElement('img');
    imgPage.setAttribute('src','files.png');
    imgPage.setAttribute('height','20');
    bookCard.appendChild(imgPage);

    const pageDisplay = document.createElement('div');
    pageDisplay.textContent = this.page;
    bookCard.appendChild(pageDisplay);

    const checkBxLabel = document.createElement('label');
    checkBxLabel.setAttribute('for','book-card');
    checkBxLabel.textContent = 'Read?';

    const checkBx = document.createElement('input');
    checkBx.setAttribute('type','checkbox');

    checkBx.checked = this.read;
    bookCard.appendChild(checkBxLabel);
    bookCard.appendChild(checkBx);

    const rmvBtn = document.createElement('button');
    rmvBtn.className = 'remove-button';
    rmvBtn.appendChild(document.createTextNode("Remove"));
    bookCard.appendChild(rmvBtn);

    rmvBtn.addEventListener("click", () => {
        const index = myLibrary.indexOf(this);

        if(index != -1) {
            myLibrary.splice(index,1);
            bookContainer.removeChild(bookCard);
        }
    });

    checkBx.addEventListener("click", () => {
        checkBx.checked ? this.read = true : this.read = false;
    });
}

function addBookToLibrary(title,author,page,read) {
    if(myLibrary.some(myLibrary => myLibrary.title.toLowerCase() == title.toLowerCase()) && myLibrary.some(myLibrary => myLibrary.author.toLowerCase() == author.toLowerCase())) {
        return responseBox.textContent = "Book Already Exists";
    } else {
        let bookAdd = new Book(title,author,page,read);
        myLibrary.push(bookAdd);
        return mainDialog.close([title,author,page,read]);
    }
}

addBook.addEventListener('click', () => {
    mainDialog.showModal();
})

mainDialog.addEventListener("close", () => {
    if(mainDialog.returnValue != 'cancel') {
        for (book in myLibrary) {
            myLibrary[book].displayBook();
        }
    }
})

submitBtn.addEventListener("click", (event) => {
    let valueCheck = [];

    for (let i = 0; i < inputForm.length; i++) {
        if (inputForm[i].value != '' && inputForm[i].value != 'on') {
            valueCheck.push(inputForm[i].value);
        }
    }

    if (valueCheck.length > 2) {
        event.preventDefault();
        addBookToLibrary(inputForm[0].value,inputForm[1].value,inputForm[2].value,inputForm[3].checked);
        form.reset();
    }
})

cancelBtn.addEventListener("click", (event) => {
    mainDialog.close();
    form.reset();
})

addBookToLibrary('Pride and Prejudice', 'Jane Austen', 254, true);
addBookToLibrary('Little Women', 'Louisa May Alcott', 759, false);

for (book in myLibrary) {
    myLibrary[book].displayBook();
}
