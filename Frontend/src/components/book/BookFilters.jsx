import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Plus } from 'lucide-react';
import { debounce } from '../../utils';

export const BookFilters = ({
  onSearch,
  onFilter,
  onAddBook,
  genres = [],
  totalCount = 0,
  filteredCount = 0
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Debounced search
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      onSearch(searchTerm);
    }, 300);

    debouncedSearch();
  }, [searchTerm, onSearch]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    onFilter({ genre, status: selectedStatus });
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onFilter({ genre: selectedGenre, status });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSelectedStatus('');
    onSearch('');
    onFilter({ genre: '', status: '' });
  };

  const hasActiveFilters = searchTerm || selectedGenre || selectedStatus;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Book Collection</h2>
          <p className="text-sm text-gray-600">
            {filteredCount !== totalCount 
              ? `Showing ${filteredCount} of ${totalCount} books`
              : `${totalCount} books total`
            }
          </p>
        </div>
        <button
          onClick={onAddBook}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus-ring"
        >
          <Plus size={20} />
          Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Genre Filter */}
        <div className="min-w-40">
          <select
            value={selectedGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="min-w-40">
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors focus-ring"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {selectedGenre && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Genre: {selectedGenre}
              <button
                onClick={() => handleGenreChange('')}
                className="hover:bg-green-200 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {selectedStatus && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Status: {selectedStatus}
              <button
                onClick={() => handleStatusChange('')}
                className="hover:bg-purple-200 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};