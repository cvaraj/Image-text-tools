import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useSEO from './useSEO';

export default function ImageToPdf() {
  useSEO({
    title: 'Image to PDF Converter',
    description: 'Quickly transform your images (JPG, PNG, GIF) into high-quality PDF documents. No watermarks, completely free.',
    keywords: 'image to pdf, convert jpg to pdf, picture to pdf, free image to pdf converter'
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
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
      const res = await axios.post('https://image-text-tools.onrender.com/api/image-to-pdf', fd, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted_image.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      setError('Failed to convert image to PDF. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="tool-page-container w-100" style={{ width: '100%' }}>
        <Link to="/" className="back-btn">← Back to Tools</Link>
        <div className="glass-panel">
          <div className="tool-page-header">
            <h1 className="tool-page-title">📕 Image → PDF</h1>
            <p className="tool-page-subtitle">Transform images into PDF documents</p>
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
                {loading ? <><span className="spinner"></span> Converting...</> : '🚀 Convert to PDF'}
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
          </div>
        </div>
      </div>
    </div>
  );
}
