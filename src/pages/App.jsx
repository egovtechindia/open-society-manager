import React from 'react';
import Dashboard from './Dashboard';
import Rules from './Rules';
import Meetings from './Meetings';
import Complaints from './Complaints'; // 1. IMPORT THE NEW PAGE

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '1rem' }}>
      <h1>🏢 Polaris Elina Society App</h1>
      <Dashboard />
      <Rules />
      <Meetings />
      <Complaints /> {/* 2. ADD THE COMPONENT HERE */}
    </div>
  );
}