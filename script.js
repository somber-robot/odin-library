const myLibrary = [];

function Book(title, author, pageCount, read){
    if (!new.target) throw Error("No new keyword");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pageCount;
    this.read = read;
}

function addBookToLibrary(title, author, pageCount) {
    let book = new Book(title, author, pageCount, false)
    myLibrary.push(book);
    createCard(book);
}

let addBtn = document.querySelector("#add-book");
let dialog = document.querySelector("#dialog");
let titleInput = document.querySelector("#title-input");
let authorInput = document.querySelector("#author-input");
let pagesInput = document.querySelector("#pages-input");
let addBook = document.querySelector("#new-book");
let cancelBook = document.querySelector("#cancel-book");

addBtn.addEventListener("click", function(e){
    dialog.showModal();
});

dialog.addEventListener("click", function(e){
    if (pagesInput.value != "" && pagesInput.value < 1)
        pagesInput.value = 1;
});

addBook.addEventListener("click", function(e){
    if (titleInput.value.trim() == "" | authorInput.value.trim() == "" | pagesInput.value == "") {
        alert("Fill in all fields.");
        return;
    };
    addBookToLibrary(titleInput.value, authorInput.value, +pagesInput.value);
    clearDialog();
});

cancelBook.addEventListener("click", clearDialog);

function clearDialog(){
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = null;
    dialog.close();
}

function createCard(book){
    let card = document.createElement("div");
    card.classList.add("card");
    let title = document.createElement("p");
    title.innerText = book.title;
    title.classList.add("title");
    let author = document.createElement("p");
    author.innerText = `By: ${book.author}`;
    author.classList.add("author");
    let pages = document.createElement("p");
    pages.innerText = `${(book.pages > 10000) ? "10000+" : book.pages} ${(book.pages == 1) ? "page" : "pages"}`;
    pages.classList.add("pages");
    let status = document.createElement("button");
    status.innerText = "Toggle Status";
    status.classList.add("status"); 
    status.addEventListener("click", function(e){
        if (!card.classList.contains("card-read")){
            card.classList.add("card-read");
            book.read = true;
        }else{
            card.classList.remove("card-read");
            book.read = false;
        }
    });
    let remove = document.createElement("button");
    remove.innerText = "Remove";
    remove.classList.add("delete");
    remove.addEventListener("click", function(e){
        myLibrary.splice(myLibrary.indexOf(book), 1);
        card.parentNode.removeChild(card);
    });
    card.append(title, author, pages, status, remove);
    let cards = document.querySelector("#cards");
    cards.insertBefore(card, addBtn);
}   
