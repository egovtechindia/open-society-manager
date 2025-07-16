import React from 'react';
import Dashboard from './Dashboard';
import Rules from './Rules';
import Meetings from './Meetings';
export default function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '1rem' }}>
      <h1>🏢 Polaris Elina Society App</h1>
      <Dashboard />
      <Rules />
      <Meetings />
    </div>
  );
}
