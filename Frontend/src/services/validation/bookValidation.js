export const bookValidationRules = {
    title: {
      required: 'Title is required',
      minLength: {
        value: 1,
        message: 'Title must be at least 1 character'
      },
      maxLength: {
        value: 200,
        message: 'Title must be less than 200 characters'
      }
    },
    author: {
      required: 'Author is required',
      minLength: {
        value: 1,
        message: 'Author must be at least 1 character'
      },
      maxLength: {
        value: 100,
        message: 'Author must be less than 100 characters'
      }
    },
    genre: {
      required: 'Genre is required'
    },
    publishedYear: {
      required: 'Published year is required',
      min: {
        value: 1000,
        message: 'Year must be greater than 1000'
      },
      max: {
        value: new Date().getFullYear(),
        message: `Year cannot be greater than ${new Date().getFullYear()}`
      },
      valueAsNumber: true
    },
    status: {
      required: 'Status is required'
    }
  };
  
  export const validateBook = (bookData) => {
    const errors = {};
  
    // Title validation
    if (!bookData.title?.trim()) {
      errors.title = 'Title is required';
    } else if (bookData.title.trim().length < 1) {
      errors.title = 'Title must be at least 1 character';
    } else if (bookData.title.trim().length > 200) {
      errors.title = 'Title must be less than 200 characters';
    }
  
    // Author validation
    if (!bookData.author?.trim()) {
      errors.author = 'Author is required';
    } else if (bookData.author.trim().length < 1) {
      errors.author = 'Author must be at least 1 character';
    } else if (bookData.author.trim().length > 100) {
      errors.author = 'Author must be less than 100 characters';
    }
  
    // Genre validation
    if (!bookData.genre?.trim()) {
      errors.genre = 'Genre is required';
    }
  
    // Published year validation
    if (!bookData.publishedYear) {
      errors.publishedYear = 'Published year is required';
    } else {
      const year = parseInt(bookData.publishedYear);
      const currentYear = new Date().getFullYear();
      if (year < 1000) {
        errors.publishedYear = 'Year must be greater than 1000';
      } else if (year > currentYear) {
        errors.publishedYear = `Year cannot be greater than ${currentYear}`;
      }
    }
  
    // Status validation
    if (!bookData.status?.trim()) {
      errors.status = 'Status is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };