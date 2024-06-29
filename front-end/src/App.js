
import React from 'react';
import './App.css';
import { TodoWrapper } from './components/TodoWrapper';
import Footer from './components/Footer'; 

export function App(props) {
  return (
    <div className="App">
      <TodoWrapper />
      <Footer /> 
    </div>
  );
}
export default App;
  