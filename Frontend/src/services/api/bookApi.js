// Mock API service - Replace with actual API calls
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bookApi = {
  // GET /books
  getBooks: async () => {
    await delay(500);
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    return { data: books, success: true };
  },

  // POST /books
  createBook: async (bookData) => {
    await delay(500);
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const newBook = {
      ...bookData,
      id: Date.now().toString()
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    return { data: newBook, success: true };
  },

  // PUT /books/:id
  updateBook: async (id, bookData) => {
    await delay(500);
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
      books[index] = { ...bookData, id };
      localStorage.setItem('books', JSON.stringify(books));
      return { data: books[index], success: true };
    }
    throw new Error('Book not found');
  },

  // DELETE /books/:id
  deleteBook: async (id) => {
    await delay(500);
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const filteredBooks = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
    return { success: true };
  }
};