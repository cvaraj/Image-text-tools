import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ImageToText from './ImageToText';
import ImageToWord from './ImageToWord';
import ImageToPdf from './ImageToPdf';
import PdfToText from './PdfToText';
import PdfToWord from './PdfToWord';
import ImageBackgroundRemover from './ImageBackgroundRemover';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-to-text" element={<ImageToText />} />
        <Route path="/image-to-word" element={<ImageToWord />} />
        <Route path="/image-to-pdf" element={<ImageToPdf />} />
        <Route path="/pdf-to-text" element={<PdfToText />} />
        <Route path="/pdf-to-word" element={<PdfToWord />} />
        <Route path="/remove-background" element={<ImageBackgroundRemover />} />
      </Routes>
    </Router>
  );
}
