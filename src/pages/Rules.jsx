import React from 'react';
export default function Rules() {
  const rules = [
    { id: 1, text: 'No loud music after 10 PM', date: '2024-03-15' },
    { id: 2, text: 'Pets not allowed in common area', date: '2024-06-01' }
  ];
  return (
    <div>
      <h2>📜 Rules & Resolutions</h2>
      <ul>{rules.map(rule => <li key={rule.id}><b>{rule.text}</b> <em>({rule.date})</em></li>)}</ul>
    </div>
  );
}