import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient'; // We will use our central client

export default function ComplaintForm({ onNewComplaint }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Get the current logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage('Error: You must be logged in to file a complaint.');
      setLoading(false);
      return;
    }

    // Insert the new complaint into the database
    const { error } = await supabase
      .from('complaints')
      .insert({
        title: title,
        description: description,
        submitted_by: user.id // Associate complaint with the logged-in user
      });

    if (error) {
      setMessage(`Error submitting complaint: ${error.message}`);
    } else {
      setMessage('Complaint submitted successfully!');
      setTitle('');
      setDescription('');
      // Tell the parent component that a new complaint has been added
      if (onNewComplaint) {
        onNewComplaint();
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>📝 File a New Complaint</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="title">Title:</label><br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '95%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="description">Description:</label><br />
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '95%', padding: '8px', minHeight: '80px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </form>
    </div>
  );
}