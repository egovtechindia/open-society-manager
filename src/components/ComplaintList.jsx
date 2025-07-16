import React from 'react';

export default function ComplaintList({ complaints, loading }) {
  if (loading) {
    return <p>Loading complaints...</p>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>📂 My Submitted Complaints</h3>
      {complaints.length === 0 ? (
        <p>You have not submitted any complaints yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {complaints.map(c => (
            <li key={c.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
              <strong>{c.title}</strong> (Status: {c.status})<br />
              <small>{c.description}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}