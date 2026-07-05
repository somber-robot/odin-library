const myLibrary = [];

function Book(title, author, pageCount, read){
    if (!new.target) throw Error("No new keyword");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pageCount;
    this.read = read;

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    };
}

function addBookToLibrary(title, author, pageCount) {
    myLibrary.push(new Book(title, author, pageCount, false));
}

const table = document.querySelector("#books");

let index = 1;

function displayBooks(){
    myLibrary.forEach(function(book, i){
        if (i+1 < index) return;
        let row = document.createElement("tr");
        let sn = document.createElement("td");
        sn.innerText = `${index++}`;
        row.appendChild(sn);
        let title = document.createElement("td");
        title.innerText = book.title;
        row.appendChild(title);
        let author = document.createElement("td");
        author.innerText = book.author;
        row.appendChild(author);
        let pages = document.createElement("td");
        pages.innerText = book.pages;
        row.appendChild(pages);
        let status = document.createElement("td");
        status.innerText = book.read ? "Read" : "Not Read";
        row.appendChild(status);
        table.appendChild(row);
    });
}

const dialog = document.querySelector("#form");
const submit = document.querySelector("#submit");
submit.addEventListener("click", function(e){
    e.preventDefault();
    let titleInput = document.querySelector("#title")
    let title = titleInput.value;
    titleInput.value = "";
    let authorInput = document.querySelector("#author");
    let author = authorInput.value;
    authorInput.value = "";
    let pagesInput = document.querySelector("#pages");
    let pages = pagesInput.value;
    pagesInput.value = "";
    if (title === "" | author === "" | pages === ""){
        alert("fill all data fields");
        return;
    }
    addBookToLibrary(title, author, pages);
    displayBooks();
    dialog.close();
});