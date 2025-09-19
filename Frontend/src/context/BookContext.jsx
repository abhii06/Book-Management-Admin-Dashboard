import React, { createContext, useReducer, useEffect } from 'react';
import { bookApi } from '../services/api';
import { mockBooks } from '../data/mockBooks';

export const BookContext = createContext();

const initialState = {
  books: [],
  loading: false,
  error: null
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_BOOKS':
      return { ...state, books: action.payload, loading: false, error: null };
    case 'ADD_BOOK':
      return { 
        ...state, 
        books: [...state.books, action.payload], 
        loading: false, 
        error: null 
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
        loading: false,
        error: null
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Initialize books on mount
  useEffect(() => {
    initializeBooks();
  }, []);

  const initializeBooks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if books exist in localStorage
      const existingBooks = localStorage.getItem('books');
      if (!existingBooks) {
        // Initialize with mock data
        localStorage.setItem('books', JSON.stringify(mockBooks));
      }
      
      const result = await bookApi.getBooks();
      if (result.success) {
        dispatch({ type: 'SET_BOOKS', payload: result.data });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const addBook = async (bookData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await bookApi.createBook(bookData);
      
      if (result.success) {
        dispatch({ type: 'ADD_BOOK', payload: result.data });
        return { success: true };
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await bookApi.updateBook(id, bookData);
      
      if (result.success) {
        dispatch({ type: 'UPDATE_BOOK', payload: result.data });
        return { success: true };
      } else {
        throw new Error('Failed to update book');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const deleteBook = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await bookApi.deleteBook(id);
      
      if (result.success) {
        dispatch({ type: 'DELETE_BOOK', payload: id });
        return { success: true };
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    addBook,
    updateBook,
    deleteBook,
    clearError,
    refreshBooks: initializeBooks
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};