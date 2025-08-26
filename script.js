let books=[];
let table=document.querySelector("#table");
class book{
    constructor(bookName,author,pages){
        this.id=crypto.randomUUID();
        this.bookName=bookName;
        this.author=author;
        this.pages=pages;
        this.readStatus=false;
    }
    toggleRead() {
        this.readStatus = !this.readStatus;
    }
}
function saveBooks(){
    localStorage.setItem('books',JSON.stringify(books));
}
function loadBooks(){
    const booksData = localStorage.getItem('books');
    if (booksData) {
        books = JSON.parse(booksData).map(obj => {
            let b = new book(obj.bookName, obj.author, obj.pages);
            b.id = obj.id;
            b.readStatus = obj.readStatus;
            return b;
        });
        books.forEach(bookObj => addBookRow(bookObj));
    }
}
loadBooks();
function addBook(bookName,author,pages){
    let newBook=new book(bookName,author,pages);
    books.push(newBook);
}
function addBookRow(bookObj){
    let row=document.createElement("tr");
    for(let elem in bookObj){
        if(elem!='id' && elem!='readStatus'){
            let cell=document.createElement("td");
            cell.textContent=bookObj[elem];
            row.appendChild(cell);
        }
    }
    let readStatus=document.createElement("td");
    bookObj.readStatus ? readStatus.textContent="✅" : readStatus.textContent="❌";
    row.appendChild(readStatus);
    let btn1=document.createElement("td");
    let readBtn=document.createElement("button");
    readBtn.style.backgroundColor="green";
    readBtn.textContent="Read";
    readBtn.addEventListener("click",()=>{
        bookObj.toggleRead();
        if(bookObj.readStatus){
            readStatus.textContent="✅";
        }
        else {
            readStatus.textContent="❌";
        }
        saveBooks();
    });
    btn1.appendChild(readBtn);
    row.appendChild(btn1);
    let btn2=document.createElement("td");
    let deleteBtn=document.createElement("button");
    deleteBtn.style.backgroundColor="red";
    deleteBtn.textContent="Delete";
    deleteBtn.addEventListener("click",()=>{
        row.remove();
        books = books.filter(b => b.id !== bookObj.id);
        saveBooks();
    });
    btn2.appendChild(deleteBtn);
    row.appendChild(btn2);
    table.appendChild(row);
}
const newBook=document.querySelector("#newBook");
const dialog=document.querySelector("#dialog");
newBook.addEventListener("click",()=>{
    dialog.showModal();
});
const closeDialog=document.querySelector("#closeDialog");
closeDialog.addEventListener("click",()=>{
    dialog.close();
});
const form=document.querySelector('form');
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let bookName=form.elements['name'].value;
    let author=form.elements['author'].value;
    let pages=form.elements['pages'].value;
    if(bookName && author){
        addBook(bookName,author,pages);
        addBookRow(books[books.length-1]);
        saveBooks();
        dialog.close();
    }
    form.reset();
});
