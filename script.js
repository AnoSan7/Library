let books=[];
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
    
}
console.log(books);