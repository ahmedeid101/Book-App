exports.Book = class Book{
    constructor(bookId, title, description, isban, publisher, author, pages){
        this.bookId = bookId;
        this.title = title;
        this.description = description;
        this.isban = isban;
        this.publisher = publisher;
        this.author = author;
        this.pages = pages;
    }
}