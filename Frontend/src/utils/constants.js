export const BOOK_STATUS = {
    AVAILABLE: 'Available',
    ISSUED: 'Issued'
  };
  
  export const GENRES = [
    'Fiction',
    'Romance',
    'Fantasy',
    'Science Fiction',
    'Dystopian',
    'Mystery',
    'Thriller',
    'Biography',
    'History',
    'Non-Fiction',
    'Poetry'
  ];
  
  export const PAGINATION = {
    ITEMS_PER_PAGE: 10,
    MAX_PAGE_BUTTONS: 5
  };
  
  export const MESSAGES = {
    SUCCESS: {
      BOOK_ADDED: 'Book added successfully!',
      BOOK_UPDATED: 'Book updated successfully!',
      BOOK_DELETED: 'Book deleted successfully!'
    },
    ERROR: {
      BOOK_ADD_FAILED: 'Failed to add book. Please try again.',
      BOOK_UPDATE_FAILED: 'Failed to update book. Please try again.',
      BOOK_DELETE_FAILED: 'Failed to delete book. Please try again.',
      NETWORK_ERROR: 'Network error. Please check your connection.'
    }
  };