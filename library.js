let myLibrary = [];

function Book(title,author,page,read) {
    this.title = title
    this.author = author
    this.page = page
    this.read = Boolean(read)

    this.readTrue = () => {this.read = true}
    this.readFalse = () => {this.read = false}
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

function displayBook(arr) {
    bookContainer.replaceChildren();

    for (let book in arr) {
        let bookKeys = Object.keys(arr[book]);
        const bookCard = document.createElement('div');
        bookCard.id = "book-card";
        bookContainer.appendChild(bookCard); 
        const checkBx = document.createElement('input');
        checkBx.setAttribute('type','checkbox');

        const checkBxLabel = document.createElement('label');
        checkBxLabel.setAttribute('for','book-card');
        checkBxLabel.textContent = 'Read?';


        for (let bookKey in bookKeys) {
            if (bookKeys[bookKey] == 'read' && arr[book][bookKeys[bookKey]] == true) {
                checkBx.checked = true;
                bookCard.appendChild(checkBxLabel);
                bookCard.appendChild(checkBx);
            } else if (bookKeys[bookKey] == 'read' && arr[book][bookKeys[bookKey]] == false) {
                checkBx.checked = false;
                 bookCard.appendChild(checkBxLabel);
                bookCard.appendChild(checkBx);
            } else if (typeof(arr[book][bookKeys[bookKey]]) != 'function' && bookKeys[bookKey] == 'page') {
                const imgPage = document.createElement('img');
                imgPage.setAttribute('src','files.png');
                imgPage.setAttribute('height','20');
                bookCard.appendChild(imgPage);

                const valueDisplay = document.createElement('div');
                valueDisplay.textContent = arr[book][bookKeys[bookKey]];
                bookCard.appendChild(valueDisplay);
            } else if (typeof(arr[book][bookKeys[bookKey]]) != 'function' && bookKeys[bookKey] != 'page') {
                const valueDisplay = document.createElement('div');
                valueDisplay.textContent = arr[book][bookKeys[bookKey]];
                bookCard.appendChild(valueDisplay);
            }
        }
    
        const rmvBtn = document.createElement('button');
        rmvBtn.className = 'remove-button';
        rmvBtn.value = book;
        bookCard.appendChild(rmvBtn);

        rmvBtn.appendChild(document.createTextNode("Remove"));

        rmvBtn.addEventListener("click", () => {
            arr.splice(book,1);
            displayBook(arr);
        });

        checkBx.addEventListener("click", () => {
            checkBx.checked ? arr[book]['readTrue']() : arr[book]['readFalse']();
        });
    }
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

addBookToLibrary('Pride and Prejudice', 'Jane Austen', 254, true);
addBookToLibrary('Little Women', 'Louisa May Alcott', 759, false);
displayBook(myLibrary);

addBook.addEventListener('click', () => {
    mainDialog.showModal();
})

mainDialog.addEventListener("close", () => {
    mainDialog.returnValue != 'cancel' ? displayBook(myLibrary) : null;
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

