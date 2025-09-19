let books = [
    { id: 1, title: "Atomic Habits", author: "James Clear" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 3, title: "Deep Work", author: "Cal Newport" }
  ];
  
  export const getBooks = async () => {
    return new Promise((res) => setTimeout(() => res([...books]), 500));
  };
  
  export const addBook = async (book) => {
    return new Promise((res) => {
      const newBook = { id: Date.now(), ...book };
      books.push(newBook);
      setTimeout(() => res(newBook), 500);
    });
  };
  
  export const updateBook = async (id, updatedBook) => {
    return new Promise((res) => {
      books = books.map((b) => (b.id === id ? { ...b, ...updatedBook } : b));
      setTimeout(() => res({ id, ...updatedBook }), 500);
    });
  };
  
  export const deleteBook = async (id) => {
    return new Promise((res) => {
      books = books.filter((b) => b.id !== id);
      setTimeout(() => res(true), 500);
    });
  };
  