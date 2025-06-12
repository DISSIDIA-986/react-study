import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home/Home';
import { Chapters } from './pages/Chapters/Chapters';
import { ChapterDetail } from './pages/Chapters/ChapterDetail';
import { Learn } from './pages/Learn/Learn';
import { Challenges } from './pages/Challenges/Challenges';
import { Reference } from './pages/Reference/Reference';
import { CourseProvider } from './context/CourseContext';

const App: React.FC = () => {
  return (
    <CourseProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapters/:chapterId" element={<ChapterDetail />} />
              <Route path="/learn/:chapterId/:sectionId" element={<Learn />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/reference" element={<Reference />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CourseProvider>
  );
};

export default App;
