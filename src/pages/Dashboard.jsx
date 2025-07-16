import React from 'react';
export default function Dashboard() {
  const owners = [
    { name: 'Rahul Shah', flat: 'A-101', phone: '9876543210' },
    { name: 'Priya Patel', flat: 'B-203', phone: '9876501234' }
  ];
  return (
    <div>
      <h2>👥 Apartment Owners</h2>
      <ul>{owners.map((o, i) => <li key={i}>{o.flat}: {o.name} ({o.phone})</li>)}</ul>
    </div>
  );
}