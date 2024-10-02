const books = [
  { title: "1984", author: "George Orwell", pages: 328, genre: "Dystopian" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, genre: "Fiction" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, genre: "Fiction" },
  { title: "Brave New World", author: "Aldous Huxley", pages: 311, genre: "Dystopian" },
  { title: "Pride and Prejudice", author: "Jane Austen", pages: 432, genre: "Romance" }
];

console.log("Original array:");
console.log(books);

console.log("\n1. map():");
const bookTitles = books.map(book => book.title);
console.log(bookTitles);

console.log("\n2. filter():");
const longBooks = books.filter(book => book.pages > 300);
console.log(longBooks);

console.log("\n3. reduce():");
const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
console.log(`Total pages: ${totalPages}`);

console.log("\n4. forEach():");
books.forEach(book => console.log(`${book.title} by ${book.author}`));

console.log("\n5. find():");
const dystopianBook = books.find(book => book.genre === "Dystopian");
console.log(dystopianBook);

console.log("\n6. some():");
const hasShortBook = books.some(book => book.pages < 200);
console.log(`Has book with less than 200 pages: ${hasShortBook}`);

console.log("\n7. every():");
const allLongBooks = books.every(book => book.pages > 150);
console.log(`All books have more than 150 pages: ${allLongBooks}`);

console.log("\n8. sort():");
const sortedBooks = [...books].sort((a, b) => a.pages - b.pages);
console.log(sortedBooks);

console.log("\n9. pop():");
const booksCopy = [...books];
const removedBook = booksCopy.pop();
console.log(`Removed book: ${removedBook.title}`);
console.log("Remaining books:", booksCopy.map(book => book.title));

console.log("\n10. shift():");
const booksCopy2 = [...books];
const firstBook = booksCopy2.shift();
console.log(`Removed first book: ${firstBook.title}`);
console.log("Remaining books:", booksCopy2.map(book => book.title));

console.log("\n11. slice():");
const middleThreeBooks = books.slice(1, 4);
console.log(middleThreeBooks.map(book => book.title));