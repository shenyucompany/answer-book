import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnswerBook from './pages/AnswerBook';
import StarryBackground from './components/StarryBackground';

function App() {
  return (
    <Router>
      <StarryBackground />
      <Routes>
        <Route path="/" element={<AnswerBook />} />
      </Routes>
    </Router>
  );
}

export default App;