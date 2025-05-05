import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DesignSettings() {
  const [settings, setSettings] = useState({
    backgroundImage: '',
    logoImage: '',
    textPosition: 'center',
  });
  const [error, setError] = useState('');
  const [previewStyle, setPreviewStyle] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/design-settings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSettings({
        backgroundImage: res.data.backgroundImage || '',
        logoImage: res.data.logoImage || '',
        textPosition: res.data.textPosition || 'center',
      });
      updatePreviewStyle(res.data);
    } catch (err) {
      setError('Failed to fetch design settings');
    }
  };

  const updatePreviewStyle = (data) => {
    setPreviewStyle({
      backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: data.textPosition || 'center',
      minHeight: '200px',
      padding: '20px',
      color: '#fff',
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Upload image file
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedSettings = { ...settings, [name]: reader.result };
        setSettings(updatedSettings);
        updatePreviewStyle(updatedSettings);
      };
      reader.readAsDataURL(file);
    } else {
      const updatedSettings = { ...settings, [name]: value };
      setSettings(updatedSettings);
      updatePreviewStyle(updatedSettings);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/design-settings', settings, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Design settings saved successfully');
    } catch (err) {
      setError('Failed to save design settings');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Visual Web Design Customization</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Background Image</label>
          <input type="file" name="backgroundImage" accept="image/*" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Logo Image</label>
          <input type="file" name="logoImage" accept="image/*" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Text Position</label>
          <select name="textPosition" value={settings.textPosition} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Design Settings
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Preview</h3>
      <div style={previewStyle}>
        <img src={settings.logoImage} alt="Logo" style={{ maxHeight: '80px', marginBottom: '10px' }} />
        <p style={{ fontSize: '24px' }}>Sample Text Position: {settings.textPosition}</p>
      </div>
    </div>
  );
}

export default DesignSettings;
