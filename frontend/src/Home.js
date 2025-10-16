import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const tools = [
    {
      path: '/image-to-text',
      title: 'Image to Text OCR',
      description: 'Extract text from images using advanced OCR technology',
      icon: '🧠',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      path: '/image-to-word',
      title: 'Image to Word',
      description: 'Convert images to editable Word documents',
      icon: '📄',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      path: '/image-to-pdf',
      title: 'Image to PDF',
      description: 'Transform images into PDF format',
      icon: '📕',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      path: '/pdf-to-text',
      title: 'PDF to Text',
      description: 'Extract text content from PDF files',
      icon: '📖',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      path: '/pdf-to-word',
      title: 'PDF to Word',
      description: 'Convert PDF files to editable Word documents',
      icon: '📝',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      path: '/remove-background',
      title: 'Background Remover',
      description: 'Remove backgrounds from images with perfect precision',
      icon: '🎨',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          padding: '60px 40px',
          marginBottom: '40px'
        }}>
          <h1 style={{
            margin: '0 0 20px 0',
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🛠️ ImageExtractor
          </h1>
          <p style={{
            margin: '0',
            fontSize: '1.3rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Powerful tools for document conversion and text extraction. Choose a tool below to get started.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto',
          paddingBottom: '60px',
          // marginBottom:50
        }}>
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display:"inline-table"
              }}
            >
              <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                padding: '20px 30px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
              // onMouseOver={(e) => {
              //   e.target.style.transform = 'translateY(-10px)';
              //   e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.transform = 'translateY(0)';
              //   e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              // }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px'
                }}>
                  {tool.icon}
                </div>
                <h3 style={{
                  margin: '0 0 15px 0',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {tool.title}
                </h3>
                <p style={{
                  margin: '0',
                  color: '#666',
                  fontSize: '1rem',
                  lineHeight: '1.5'
                }}>
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
