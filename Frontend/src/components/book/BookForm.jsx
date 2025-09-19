import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../common/Modal';
import { GENRES, BOOK_STATUS } from '../../utils/constants';
import { bookValidationRules } from '../../services/validation';

export const BookForm = ({ isOpen, onClose, book, onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      status: BOOK_STATUS.AVAILABLE
    }
  });

  // Reset form when book prop changes or modal opens
  useEffect(() => {
    if (book) {
      reset(book);
    } else if (isOpen) {
      reset({
        title: '',
        author: '',
        genre: '',
        publishedYear: new Date().getFullYear(),
        status: BOOK_STATUS.AVAILABLE
      });
    }
  }, [book, isOpen, reset]);

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      // Form will be closed by parent component on success
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={book ? 'Edit Book' : 'Add New Book'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title', bookValidationRules.title)}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter book title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Author Field */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Author *
          </label>
          <input
            id="author"
            type="text"
            {...register('author', bookValidationRules.author)}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Genre Field */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
              Genre *
            </label>
            <select
              id="genre"
              {...register('genre', bookValidationRules.genre)}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.genre ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Genre</option>
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {errors.genre && (
              <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>
            )}
          </div>

          {/* Published Year Field */}
          <div>
            <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700 mb-2">
              Published Year *
            </label>
            <input
              id="publishedYear"
              type="number"
              {...register('publishedYear', bookValidationRules.publishedYear)}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.publishedYear ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter year"
              min="1000"
              max={new Date().getFullYear()}
            />
            {errors.publishedYear && (
              <p className="mt-1 text-sm text-red-600">{errors.publishedYear.message}</p>
            )}
          </div>
        </div>

        {/* Status Field */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            {...register('status', bookValidationRules.status)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={BOOK_STATUS.AVAILABLE}>{BOOK_STATUS.AVAILABLE}</option>
            <option value={BOOK_STATUS.ISSUED}>{BOOK_STATUS.ISSUED}</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus-ring"
            disabled={isSubmitting || loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
          >
            {(isSubmitting || loading) ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
          </button>
        </div>
      </form>
    </Modal>
  );
};