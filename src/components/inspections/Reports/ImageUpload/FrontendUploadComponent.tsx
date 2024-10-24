// components/ImageUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setImageUrl(response.data.fileUrl);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <p>Uploading...</p>}

      {imageUrl && (
        <div>
          <p>Uploaded Successfully!</p>
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            style={{ maxWidth: '300px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;