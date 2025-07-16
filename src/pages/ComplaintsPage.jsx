

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export default function ComplaintsPage({ user, role }) {
  // All the logic and JSX from the previous message for this file goes here.
  // It is the same code. Just create the file and paste it in.
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('complaints').select(`*, profiles (email)`).order('created_at', { ascending: false });
    
    if (role !== 'admin') {
      query = query.eq('user_id', user.id)
    }

    const { data, error } = await query;

    if (error) console.error('Error fetching complaints:', error);
    else setComplaints(data);
    setLoading(false);
  }, [user.id, role]);

  useEffect(() => { fetchComplaints(); }, [fetchComplaints]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) { setError('Title and description are required.'); return; }
    
    const { error: insertError } = await supabase.from('complaints').insert({ title, description, user_id: user.id });

    if (insertError) setError(insertError.message);
    else {
      setTitle('');
      setDescription('');
      setError('');
      fetchComplaints();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">File a New Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit Complaint
          </button>
        </form>
      </div>

      
      
    </div>
  );
}