import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function ImageToText() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setText('');
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setText('');
      setError('');
    } else {
      setError('Please drop a valid image file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleUpload = async () => {
    if (!image) return setError('Please select an image first');
    setLoading(true);
    const fd = new FormData();
    fd.append('image', image);
    try {
      const res = await axios.post('http://localhost:5000/api/extract', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setText(res.data.text || '');
    } catch (err) {
      console.error(err);
      setError('Failed to extract text. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '40px 30px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: 'bold' }}>🧠 Image → Text OCR</h1>
          <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>Upload an image and extract text using advanced OCR technology</p>
        </div>

        <div style={{ padding: '40px 30px' }}>
          <div
            style={{
              border: `2px dashed ${dragOver ? '#4facfe' : '#ddd'}`,
              borderRadius: '15px',
              padding: '40px',
              textAlign: 'center',
              background: dragOver ? '#f0f8ff' : '#fafafa',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              marginBottom: '30px'
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current.click()}
          >
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📁</div>
            <p style={{ fontSize: '1.2rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              {image ? `Selected: ${image.name}` : 'Drag & drop an image here or click to browse'}
            </p>
            <p style={{ margin: '0', color: '#666' }}>Supported formats: JPG, PNG, GIF, etc.</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button
              onClick={handleUpload}
              disabled={loading || !image}
              style={{
                background: loading || !image ? '#ccc' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: loading || !image ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading || !image ? 'none' : '0 4px 15px rgba(79, 172, 254, 0.4)'
              }}
            >
              {loading ? '🔄 Extracting...' : '🚀 Extract Text'}
            </button>
          </div>

          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '1px solid #ffcdd2'
            }}>
              ⚠️ {error}
            </div>
          )}

          {image && (
            <div style={{
              background: '#f5f5f5',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>📸 Image Preview</h3>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          )}

          <div style={{
            background: '#f8f9fa',
            padding: '25px',
            borderRadius: '15px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: '0', color: '#333' }}>📝 Extracted Text</h3>
              {text && (
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#218838'}
                  onMouseOut={(e) => e.target.style.background = '#28a745'}
                >
                  📋 Copy
                </button>
              )}
            </div>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #dee2e6',
              minHeight: '100px',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              color: '#495057'
            }}>
              {text || 'No text extracted yet. Upload an image and click "Extract Text".'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
