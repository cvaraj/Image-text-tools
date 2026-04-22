import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const tools = [
    {
      path: '/image-to-text',
      title: 'Image to Text OCR',
      description: 'Extract text from images using advanced OCR technology',
      icon: '🧠'
    },
    {
      path: '/image-to-word',
      title: 'Image to Word',
      description: 'Convert images to editable Word documents',
      icon: '📄'
    },
    {
      path: '/image-to-pdf',
      title: 'Image to PDF',
      description: 'Transform images into PDF format',
      icon: '📕'
    },
    {
      path: '/pdf-to-text',
      title: 'PDF to Text',
      description: 'Extract text content from PDF files',
      icon: '📖'
    },
    {
      path: '/pdf-to-word',
      title: 'PDF to Word',
      description: 'Convert PDF files to editable Word documents',
      icon: '📝'
    },
    {
      path: '/remove-background',
      title: 'Background Remover',
      description: 'Remove backgrounds from images with precision',
      icon: '🎨'
    }
  ];

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="hero-section glass-panel">
          <h1 className="hero-title">🛠️ ImageExtractor</h1>
          <p className="hero-subtitle">
            Premium tools for document conversion and text extraction. Choose a tool below to get started.
          </p>
        </div>

        <div className="tool-grid">
          {tools.map((tool, index) => (
            <Link key={index} to={tool.path} className="tool-card" style={{ textDecoration: 'none' }}>
              <div className="tool-card-icon">{tool.icon}</div>
              <h3 className="tool-card-title">{tool.title}</h3>
              <p className="tool-card-desc">{tool.description}</p>
            </Link>
          ))}
        </div>

        <div className="about-section glass-panel">
          <div className="about-content">
            <h2 className="about-title">Why Choose ImageExtractor?</h2>
            <p className="about-text">
              ImageExtractor is your all-in-one suite for rapid, precise, and secure document manipulation.
              Whether you need to extract text from a scanned document using advanced AI OCR, or simply
              convert formatting between PDFs and Word documents, we handle the heavy lifting seamlessly.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <h4>Lightning Fast</h4>
                <p>Converted natively and processed locally in seconds with absolutely no waiting in queues.</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <h4>100% Secure</h4>
                <p>Your files are prioritized with privacy. We do not store your sensitive documents on our servers.</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <h4>High Precision</h4>
                <p>Top-tier OCR technology and format conversion ensures no data gets lost in translation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
