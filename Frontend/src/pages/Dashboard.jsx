import React, { useState, useMemo, useEffect } from 'react';
import { useBooks } from '../hooks';
import { BookFilters, BookTable, BookForm } from '../components/book';
import { ConfirmationDialog, Toast, Pagination } from '../components/common';
import { Header } from '../components/layout';
import { PAGINATION, MESSAGES } from '../utils/constants';

export const Dashboard = () => {
  const { 
    books, 
    loading, 
    error, 
    addBook, 
    updateBook, 
    deleteBook, 
    clearError 
  } = useBooks();

  // State for UI interactions
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ genre: '', status: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, book: null });
  const [toast, setToast] = useState(null);

  // Computed values
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = searchTerm === '' || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = filters.genre === '' || book.genre === filters.genre;
      const matchesStatus = filters.status === '' || book.status === filters.status;
      
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, searchTerm, filters]);

  const totalPages = Math.ceil(filteredBooks.length / PAGINATION.ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * PAGINATION.ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + PAGINATION.ITEMS_PER_PAGE);
  const uniqueGenres = [...new Set(books.map(book => book.genre))].sort();

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Form handlers
  const handleAddBook = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (bookData) => {
    try {
      let result;
      if (editingBook) {
        result = await updateBook(editingBook.id, bookData);
        if (result.success) {
          showToast(MESSAGES.SUCCESS.BOOK_UPDATED, 'success');
        }
      } else {
        result = await addBook(bookData);
        if (result.success) {
          showToast(MESSAGES.SUCCESS.BOOK_ADDED, 'success');
        }
      }

      if (result.success) {
        setIsFormOpen(false);
        setEditingBook(null);
      } else {
        showToast(
          editingBook ? MESSAGES.ERROR.BOOK_UPDATE_FAILED : MESSAGES.ERROR.BOOK_ADD_FAILED, 
          'error'
        );
      }
    } catch (error) {
      showToast(MESSAGES.ERROR.NETWORK_ERROR, 'error');
    }
  };

  const handleDeleteBook = (book) => {
    setDeleteDialog({ isOpen: true, book });
  };

  const confirmDelete = async () => {
    if (deleteDialog.book) {
      const result = await deleteBook(deleteDialog.book.id);
      if (result.success) {
        showToast(MESSAGES.SUCCESS.BOOK_DELETED, 'success');
      } else {
        showToast(MESSAGES.ERROR.BOOK_DELETE_FAILED, 'error');
      }
    }
    setDeleteDialog({ isOpen: false, book: null });
  };

  // Filter handlers
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <BookFilters
          onSearch={handleSearch}
          onFilter={handleFilter}
          onAddBook={handleAddBook}
          genres={uniqueGenres}
          totalCount={books.length}
          filteredCount={filteredBooks.length}
        />

        {/* Books Table */}
        <BookTable
          books={paginatedBooks}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          loading={loading}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Results Summary */}
        {filteredBooks.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Showing {startIndex + 1}–
            {Math.min(startIndex + PAGINATION.ITEMS_PER_PAGE, filteredBooks.length)} 
            {' '}of {filteredBooks.length} books
          </div>
        )}

        {/* Book Form */}
        {isFormOpen && (
          <BookForm
            isOpen={isFormOpen}
            onClose={() => {
              setIsFormOpen(false);
              setEditingBook(null);
            }}
            onSubmit={handleFormSubmit}
            editingBook={editingBook}
          />
        )}

        {/* Delete Confirmation */}
        <ConfirmationDialog
          isOpen={deleteDialog.isOpen}
          title="Delete Book"
          message={`Are you sure you want to delete "${deleteDialog.book?.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteDialog({ isOpen: false, book: null })}
        />

        {/* Toast Messages */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Error Handling */}
        {error && (
          <Toast
            message={error}
            type="error"
            onClose={clearError}
          />
        )}
      </main>
    </div>
  );
};
