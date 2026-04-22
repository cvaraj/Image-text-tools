import React, { useState, useRef } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { Link } from 'react-router-dom';

export default function ImageBackgroundRemover() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setProcessedImage(null);
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setProcessedImage(null);
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
    try {
      const result = await removeBackground(URL.createObjectURL(image));
      const url = URL.createObjectURL(result);
      setProcessedImage(url);
    } catch (err) {
      console.error(err);
      setError('Failed to remove background. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.setAttribute('download', 'background_removed.png');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="app-container">
      <div className="tool-page-container w-100" style={{ width: '100%', maxWidth: '1000px' }}>
        <Link to="/" className="back-btn">← Back to Tools</Link>
        <div className="glass-panel">
          <div className="tool-page-header">
            <h1 className="tool-page-title">🎨 Background Remover</h1>
            <p className="tool-page-subtitle">Remove backgrounds from images with professional precision</p>
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
                {loading ? <><span className="spinner"></span> Removing Background...</> : '🚀 Remove Background'}
              </button>
            </div>

            {error && (
              <div className="alert alert-error">
                ⚠️ {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {image && (
                <div className="file-preview" style={{ flex: '1', minWidth: '300px' }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>📸 Original Image</h3>
                  <img src={URL.createObjectURL(image)} alt="original" style={{ marginBottom: '10px' }} />
                </div>
              )}

              {processedImage && (
                <div className="file-preview" style={{ flex: '1', minWidth: '300px' }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>✨ Background Removed</h3>
                  <img src={processedImage} alt="processed" style={{ marginBottom: '15px' }} />
                  <div>
                    <button className="btn-secondary" onClick={downloadImage}>📥 Download</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
