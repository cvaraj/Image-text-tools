import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PdfToWord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please drop a valid PDF file.');
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
    if (!file) return setError('Please select a PDF file first');
    setLoading(true);
    const fd = new FormData();
    fd.append('pdf', file);
    try {
      const res = await axios.post('https://image-text-tools.onrender.com/api/pdf-to-word', fd, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted_document.docx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      setError('Failed to convert PDF to Word. See console for details.');
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
            <h1 className="tool-page-title">📝 PDF → Word</h1>
            <p className="tool-page-subtitle">Convert PDF files to editable Word documents</p>
          </div>
          <div className="tool-page-body">
            <div
              className={`dropzone ${dragOver ? 'active' : ''}`}
              onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current.click()}
            >
              <div className="dropzone-icon">📁</div>
              <p className="dropzone-text">{file ? `Selected: ${file.name}` : 'Drag & drop a PDF here or click to browse'}</p>
              <p className="dropzone-subtext">Supported format: PDF</p>
              <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleChange} style={{ display: 'none' }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <button className="btn-primary" onClick={handleUpload} disabled={loading || !file}>
                {loading ? <><span className="spinner"></span> Converting...</> : '🚀 Convert to Word'}
              </button>
            </div>

            {error && (
              <div className="alert alert-error">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
