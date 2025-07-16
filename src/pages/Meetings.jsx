import React from 'react';
export default function Meetings() {
  const minutes = [
    { id: 1, title: 'Annual Budget Meeting', signedBy: ['Rahul', 'Priya'], date: '2024-07-01' }
  ];
  return (
    <div>
      <h2>📝 Minutes of Meeting</h2>
      <ul>{minutes.map(m => <li key={m.id}><b>{m.title}</b> - <em>{m.date}</em><br />Signers: {m.signedBy.join(', ')}</li>)}</ul>
    </div>
  );
}