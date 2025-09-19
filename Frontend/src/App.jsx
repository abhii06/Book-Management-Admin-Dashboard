import React from 'react'
import { BookProvider } from './context';
import { Dashboard } from './pages';


const App = () => {
  return (
    <BookProvider>
      <Dashboard/>
    </BookProvider>
  )
};

export default App
