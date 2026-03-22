import React, { useState } from 'react';
import './UploadPanel.css';

const UploadPanel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/query/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      setMessage({ text: data.message || 'File uploaded successfully!', type: 'success' });
      setFile(null); // Clear selection
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message || 'An error occurred during upload.', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-panel card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title fw-bold" style={{ color: '#4a4a4a' }}>Upload Document</h5>
        <div className="upload-area mt-3 p-4 border rounded text-center">
            <input 
              type="file" 
              className="d-none" 
              id="fileUpload" 
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
            />
            <label htmlFor="fileUpload" className="btn btn-outline-primary mb-2 upload-btn">
              Select PDF, DOCX, TXT
            </label>
            {file && <p className="mt-2 mb-0 text-success fw-semibold">Selected: {file.name}</p>}
            {!file && <p className="mt-2 mb-0 text-muted">No file selected</p>}
        </div>
        
        <button 
          className="btn w-100 mt-3 fw-bold upload-submit-btn" 
          onClick={handleUpload} 
          disabled={!file || uploading}
        >
          {uploading ? (
            <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Uploading & Indexing...</>
          ) : (
            'Upload & Index Document'
          )}
        </button>

        {message && (
          <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mt-3 mb-0`} role="alert">
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPanel;
