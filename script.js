let books=[];
let table=document.querySelector("#table");
function book(bookName,author){
    this.id=crypto.randomUUID()
    this.bookName=bookName;
    this.author=author;
}
function addBook(bookName,author){
    let newBook=new book(bookName,author);
    books.push(newBook);
}
for(let i=0;i<5;i++){
    addBook('1','2');
}
console.log(books);
books.forEach((book)=>{
    let row=document.createElement("tr");
    for(let elem in book){
        if(elem!='id'){
            let cell=document.createElement("td");
            cell.textContent=book[elem];
            row.appendChild(cell);
        }
    }
    table.appendChild(row);
});