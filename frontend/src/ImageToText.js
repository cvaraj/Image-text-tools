import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ImageToText() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(file); setText(''); setError(''); }
  };
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) { setImage(file); setText(''); setError(''); }
    else { setError('Please drop a valid image file.'); }
  };
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => { setDragOver(false); };

  const handleUpload = async () => {
    if (!image) return setError('Please select an image first');
    setLoading(true);
    const fd = new FormData();
    fd.append('image', image);
    try {
      const res = await axios.post('https://image-text-tools.onrender.com/api/extract', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setText(res.data.text || '');
    } catch (err) {
      console.error(err); setError('Failed to extract text. See console for details.');
    } finally { setLoading(false); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="app-container">
      <div className="tool-page-container w-100" style={{ width: '100%' }}>
        <Link to="/" className="back-btn">← Back to Tools</Link>
        <div className="glass-panel">
          <div className="tool-page-header">
            <h1 className="tool-page-title">🧠 Image → Text OCR</h1>
            <p className="tool-page-subtitle">Upload an image and extract text using advanced OCR technology</p>
          </div>
          <div className="tool-page-body">
            <div
              className={`dropzone ${dragOver ? 'active' : ''}`}
              onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current.click()}
            >
              <div className="dropzone-icon">📁</div>
              <p className="dropzone-text">{image ? `Selected: ${image.name}` : 'Drag & drop an image here or click to browse'}</p>
              <p className="dropzone-subtext">Supported formats: JPG, PNG, GIF, etc.</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <button className="btn-primary" onClick={handleUpload} disabled={loading || !image}>
                {loading ? <><span className="spinner"></span> Extracting...</> : '🚀 Extract Text'}
              </button>
            </div>

            {error && (
              <div className="alert alert-error">
                ⚠️ {error}
              </div>
            )}

            {image && (
              <div className="file-preview">
                <img src={URL.createObjectURL(image)} alt="preview" />
                <div className="file-preview-info">{image.name}</div>
              </div>
            )}

            {text && (
              <div className="result-box">
                <div className="result-header">
                  <h3>📝 Extracted Text</h3>
                  <button className="btn-secondary" onClick={copyToClipboard}>📋 Copy</button>
                </div>
                <div className="result-content">
                  {text}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
