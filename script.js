let books=[];
let table=document.querySelector("#table");
function book(bookName,author,pages){
    this.id=crypto.randomUUID()
    this.bookName=bookName;
    this.author=author;
    this.pages=pages;
    this.readStatus=false;
}
function addBook(bookName,author,pages){
    let newBook=new book(bookName,author,pages);
    books.push(newBook);
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
        const bookObj=books[books.length-1];
        let row=document.createElement("tr");
        for(let elem in books[books.length-1]){
            if(elem!='id' && elem!='readStatus'){
                let cell=document.createElement("td");
                cell.textContent=books[books.length-1][elem];
                row.appendChild(cell);
            }
        }
        let readStatus=document.createElement("td");
        readStatus.textContent="❌";
        row.appendChild(readStatus);
        let btn1=document.createElement("td");
        let readBtn=document.createElement("button");
        readBtn.textContent="Read";
        readBtn.addEventListener("click",()=>{
            if(readStatus.textContent === "❌"){
                readStatus.textContent = "✅";
                bookObj.readStatus = true;
                readBtn.disabled = true;
            }
        });
        btn1.appendChild(readBtn);
        row.appendChild(btn1);
        let btn2=document.createElement("td");
        let deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.addEventListener("click",()=>{
            row.remove();
            books = books.filter(b => b.id !== bookObj.id);
        });
        btn2.appendChild(deleteBtn);
        row.appendChild(btn2);
        table.appendChild(row);
        dialog.close();
    }
    form.reset();
});
