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

addBtn.addEventListener("click", function(e){
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 256);
});

function createCard(book){
    let card = document.createElement("div");
    card.classList.add("card");
    if(book.read) card.classList.add("card-read");
    let title = document.createElement("p");
    title.innerText = book.title;
    title.classList.add("title");
    let author = document.createElement("p");
    author.innerText = `By: ${book.author}`;
    author.classList.add("author");
    let pages = document.createElement("p");
    pages.innerText = `${book.pages} pages`;
    pages.classList.add("pages");
    let status = document.createElement("button");
    status.innerText = "Toggle Status";
    status.classList.add("status"); 
    status.addEventListener("click", function(e){
        if (!card.classList.contains("card-read")){
            card.classList.add("card-read");
        }else{
            card.classList.remove("card-read");
        }
    });
    let remove = document.createElement("button");
    remove.innerText = "Remove Book";
    remove.classList.add("delete");
    remove.addEventListener("click", function(e){
        myLibrary.splice(myLibrary.indexOf(book), 1);
        card.parentNode.removeChild(card);
    });
    card.append(title, author, pages, status, remove);
    let cards = document.querySelector("#cards");
    cards.insertBefore(card, addBtn);
}   
